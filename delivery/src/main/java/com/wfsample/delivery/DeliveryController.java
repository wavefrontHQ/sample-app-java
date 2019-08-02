package com.wfsample.delivery;

import com.wfsample.common.BeachShirtsUtils;
import com.wfsample.common.dto.DeliveryStatusDTO;
import com.wfsample.common.dto.PackedShirtsDTO;
import com.wfsample.service.DeliveryApi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

import javax.ws.rs.core.Response;

/**
 * Controller for delivery service which is responsible for dispatching shirts returning tracking
 * number for a given order.
 *
 * @author Hao Song (songhao@vmware.com).
 */
@RestController
public class DeliveryController implements DeliveryApi {
  AtomicInteger tracking = new AtomicInteger(0);
  AtomicInteger dispatch = new AtomicInteger(0);
  AtomicInteger cancel = new AtomicInteger(0);
  private final Random rand = new Random(0L);

  @Value("${request.slow.percentage}")
  private double percentage;

  @Value("${request.slow.latency}")
  private long latency;

  @Value("${request.error.interval}")
  private int globalErrorInterval;

  @Override
  public Response dispatch(String orderNum, PackedShirtsDTO packedShirts) {
    try {
      if (rand.nextDouble() < percentage) {
        Thread.sleep(latency);
      } else {
        Thread.sleep((long) (rand.nextGaussian() * 70 + 100));
      }
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    if (BeachShirtsUtils.isErrorRequest(dispatch, globalErrorInterval, 20)) {
      return Response.status(Response.Status.BAD_REQUEST).entity(
          new DeliveryStatusDTO(null, "no shirts to deliver")).build();
    }
    String trackingNum = UUID.randomUUID().toString();
    System.out.println("Tracking number of Order:" + orderNum + " is " + trackingNum);
    return Response.ok(new DeliveryStatusDTO(trackingNum, "shirts delivery dispatched")).build();
  }

  @Override
  public Response trackOrder(String orderNum) {
    if (BeachShirtsUtils.isErrorRequest(tracking, globalErrorInterval, 8)) {
      return Response.status(Response.Status.BAD_REQUEST).build();
    }
    try {
      Thread.sleep((long) (rand.nextGaussian() * 70 + 100));
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return Response.ok().build();
  }

  @Override
  public Response cancelOrder(String orderNum) {
    try {
      Thread.sleep((long) (rand.nextGaussian() * 70 + 100));
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    if (BeachShirtsUtils.isErrorRequest(cancel, globalErrorInterval, 7)) {
      return Response.status(Response.Status.BAD_REQUEST).build();
    }
    return Response.ok().build();
  }
}