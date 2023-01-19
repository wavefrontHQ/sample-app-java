package com.wfsample.delivery;

import com.google.common.collect.ImmutableMap;
import com.wavefront.sdk.jersey.WavefrontJerseyFactory;
import com.wfsample.common.BeachShirtsUtils;
import com.wfsample.common.TraceLoggerUtil;
import com.wfsample.common.dto.DeliveryStatusDTO;
import com.wfsample.common.dto.PackedShirtsDTO;
import com.wfsample.common.dto.ShirtDTO;
import com.wfsample.service.DeliveryApi;
import io.opentracing.Span;
import io.opentracing.Tracer;
import io.opentracing.log.Fields;
import io.opentracing.rxjava2.TracingObserver;
import io.opentracing.rxjava2.TracingRxJava2Utils;
import io.reactivex.Observable;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.core.Response;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import static com.wfsample.common.BeachShirtsUtils.getRequestLatency;

/**
 * Controller for delivery service which is responsible for dispatching shirts returning tracking
 * number for a given order.
 *
 * @author Hao Song (songhao@vmware.com).
 */
@RestController
public class DeliveryController implements DeliveryApi {
  static Logger logger =  LogManager.getLogger(DeliveryController.class);
  AtomicInteger tracking = new AtomicInteger(0);
  AtomicInteger dispatch = new AtomicInteger(0);
  AtomicInteger cancel = new AtomicInteger(0);
  private final Random rand = new Random(0L);
  private final Tracer tracer;

  private double percentage;
  private long latency;
  private int globalErrorInterval;

  private Observer<ShirtDTO> dispatchObserver;
  private Observer<String> asyncCleanUpObserver;

  @Autowired
  public DeliveryController(Environment env, WavefrontJerseyFactory wavefrontJerseyFactory) {
    percentage = env.getProperty("request.slow.percentage", Double.class);
    latency = env.getProperty("request.slow.latency", Long.class);
    globalErrorInterval = env.getProperty("request.error.interval", Integer.class);
    this.tracer = wavefrontJerseyFactory.getTracer();
    TracingRxJava2Utils.enableTracing(tracer);
    this.dispatchObserver = new TracingObserver<>(new Observer<ShirtDTO>() {
      @Override
      public void onSubscribe(Disposable disposable) {
        TraceLoggerUtil.traceLog(logger, tracer.activeSpan().context().toTraceId(), Level.INFO, "dispatch started!");
      }

      @Override
      public void onNext(ShirtDTO shirtDTO) {
        try {
          Thread.sleep(5);
          TraceLoggerUtil.traceLog(logger, tracer.activeSpan().context().toTraceId(), Level.INFO, shirtDTO.getStyle().getName() + " processed!");
        } catch (InterruptedException ignored) {
        }
      }

      @Override
      public void onError(Throwable throwable) {
        TraceLoggerUtil.traceLog(logger, tracer.activeSpan().context().toTraceId(), Level.WARN, "dispatch error!");
      }

      @Override
      public void onComplete() {
        try {
          Thread.sleep(200);
        } catch (InterruptedException ignored) {
        }
        TraceLoggerUtil.traceLog(logger, tracer.activeSpan().context().toTraceId(), Level.INFO, "dispatch completed!");
      }
    }, "dispatchObserver", tracer);

    this.asyncCleanUpObserver = new TracingObserver<>(new Observer<String>() {
      @Override
      public void onSubscribe(Disposable disposable) {
        TraceLoggerUtil.traceLog(logger, tracer.activeSpan().context().toTraceId(), Level.INFO, "clean up started!");
      }

      @Override
      public void onNext(String jobName) {
        try {
          Thread.sleep(1000);
          TraceLoggerUtil.traceLog(logger, tracer.activeSpan().context().toTraceId(), Level.INFO, "working on " + jobName);
        } catch (InterruptedException ignored) {

        }
      }

      @Override
      public void onError(Throwable throwable) {
        TraceLoggerUtil.traceLog(logger, tracer.activeSpan().context().toTraceId(), Level.WARN, "clean up failed!");
      }

      @Override
      public void onComplete() {
        TraceLoggerUtil.traceLog(logger, tracer.activeSpan().context().toTraceId(), Level.INFO, "clean up completed!");

      }
    }, "asyncCleanUpObserver", tracer);
  }

  @Override
  public Response dispatch(String orderNum, PackedShirtsDTO packedShirts) {
    try {
      if (rand.nextDouble() < percentage) {
        Thread.sleep(latency);
      } else {
        Thread.sleep(getRequestLatency(100, 70, rand));
      }
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    if (BeachShirtsUtils.isErrorRequest(dispatch, globalErrorInterval, 20)) {
      try {
        Thread.sleep(15000);
        throw new TimeoutException();
      } catch (Exception e) {
        Span span = tracer == null ? null : tracer.activeSpan();
        if (span != null) {
          span.log(ImmutableMap.of(
              Fields.EVENT, "error",
              Fields.ERROR_KIND, e.getClass().getName(),
              Fields.STACK, ExceptionUtils.getStackTrace(e)
          ));
          TraceLoggerUtil.traceLog(logger, span.context().toTraceId(), Level.WARN, ExceptionUtils.getStackTrace(e));
        }
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(
            new DeliveryStatusDTO(null, "shirt dispatch timed out")).build();
      }
    }
    String trackingNum = UUID.randomUUID().toString();
    System.out.println("Tracking number of Order:" + orderNum + " is " + trackingNum);
    Observable.fromIterable(packedShirts.getShirts()).subscribe(this.dispatchObserver);
    Observable.just("clean up job").subscribeOn(Schedulers.newThread()).subscribe(this.asyncCleanUpObserver);
    return Response.ok(new DeliveryStatusDTO(trackingNum, "shirts delivery dispatched")).build();
  }

  @Override
  public Response trackOrder(String orderNum) {
    if (BeachShirtsUtils.isErrorRequest(tracking, globalErrorInterval, 8)) {
      Span span = tracer == null ? null : tracer.activeSpan();
      if (span != null) {
        span.log(ImmutableMap.of(Fields.ERROR_KIND, "order number not found", "orderNum",
            orderNum));
        TraceLoggerUtil.traceLog(logger, span.context().toTraceId(), Level.WARN, "order number not found");
      }
      return Response.status(Response.Status.BAD_REQUEST).build();
    }
    try {
      Thread.sleep(getRequestLatency(100, 70, rand));
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return Response.ok().build();
  }

  @Override
  public Response cancelOrder(String orderNum) {
    try {
      Thread.sleep(getRequestLatency(100, 70, rand));
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    if (BeachShirtsUtils.isErrorRequest(cancel, globalErrorInterval, 7)) {
      Span span = tracer == null ? null : tracer.activeSpan();
      if (span != null) {
        span.log(ImmutableMap.of(Fields.ERROR_KIND, "order has already been cancelled", "orderNum",
            orderNum));
        TraceLoggerUtil.traceLog(logger, span.context().toTraceId(), Level.WARN, "order has already been cancelled");
      }
      return Response.status(Response.Status.BAD_REQUEST).build();
    }
    return Response.ok().build();
  }
}