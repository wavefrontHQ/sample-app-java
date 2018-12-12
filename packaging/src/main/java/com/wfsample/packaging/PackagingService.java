package com.wfsample.packaging;

import com.google.protobuf.ByteString;

import com.wfsample.beachshirts.GiftPack;
import com.wfsample.beachshirts.PackagingGrpc;
import com.wfsample.beachshirts.PackedShirts;
import com.wfsample.beachshirts.Void;
import com.wfsample.beachshirts.WrapRequest;
import com.wfsample.beachshirts.WrappingType;
import com.wfsample.beachshirts.WrappingTypes;
import com.wfsample.common.BeachShirtsUtils;
import com.wfsample.common.GrpcServiceConfig;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;

/**
 * Driver for the packaging service which packs the a given shirt.
 *
 * @author Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public class PackagingService {

  public PackagingService(GrpcServiceConfig config) throws Exception {
    ServerBuilder builder = ServerBuilder.forPort(config.getGrpcPort()).
        addService(new PackagingImpl());
    Server packaging = builder.build();
    System.out.println("Starting Packaging server ...");
    packaging.start();
    System.out.println("Packaging server started");
    packaging.awaitTermination();
  }

  public static void main(String[] args) throws Exception {
    GrpcServiceConfig configuration = BeachShirtsUtils.scenarioFromFile(args[0]);
    new PackagingService(configuration);
  }

  static class PackagingImpl extends PackagingGrpc.PackagingImplBase {
    private final AtomicInteger getTypes = new AtomicInteger(0);
    private final AtomicInteger restock = new AtomicInteger(0);
    private final AtomicInteger wrap = new AtomicInteger(0);
    private final AtomicInteger giftWrap = new AtomicInteger(0);
    private final Random random = new Random();

    @Override
    public void wrapShirts(WrapRequest request, StreamObserver<PackedShirts> responseObserver) {
      try {
        Thread.sleep(55);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      if (wrap.incrementAndGet() % 40 == 0) {
        // can't pack more than 10 shirts at once.
        responseObserver.onError(Status.INTERNAL.asRuntimeException());
      }
      responseObserver.onNext(PackedShirts.newBuilder().
          addAllShirts(request.getShirtsList()).
          build());
      responseObserver.onCompleted();
    }

    @Override
    public void giftWrap(WrapRequest request, StreamObserver<GiftPack> responseObserver) {
      if (giftWrap.incrementAndGet() % 30 == 0) {
        responseObserver.onError(Status.INTERNAL.asRuntimeException());
      }
      try {
        Thread.sleep(70);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      if (request.getShirtsCount() > 40) {
        int resp = (int) Math.round(random.nextDouble() *
            100.0) + 10000;
        try {
          Thread.sleep(1400);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
        ByteString byteString = ByteString.copyFrom(new byte[resp]);
        responseObserver.onNext(GiftPack.newBuilder().setGiftMaterial(byteString).build());
        responseObserver.onCompleted();
      } else {
        int resp = (int) Math.round(random.nextDouble() * 100.0);
        ByteString byteString = ByteString.copyFrom(new byte[resp]);
        responseObserver.onNext(GiftPack.newBuilder().setGiftMaterial(byteString).build());
        responseObserver.onCompleted();
      }
    }

    @Override
    public void restockMaterial(WrappingType request,
                                StreamObserver<com.wfsample.beachshirts.Status> responseObserver) {
      try {
        Thread.sleep(40);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      if (restock.incrementAndGet() % 20 == 0) {
        responseObserver.onError(Status.INTERNAL.asRuntimeException());
      } else {
        responseObserver.onNext(com.wfsample.beachshirts.Status.newBuilder().
            setStatus(true).build());
        responseObserver.onCompleted();
      }
    }

    @Override
    public void getPackingTypes(Void request, StreamObserver<WrappingTypes> responseObserver) {
      try {
        Thread.sleep(60);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      if (getTypes.incrementAndGet() % 30 == 0) {
        responseObserver.onError(Status.INTERNAL.asRuntimeException());
      } else {
        responseObserver.onNext(WrappingTypes.newBuilder().addWrappingType(WrappingType.
            newBuilder().setWrappingType("wrap wrap wrap wrap").build()).build());
        responseObserver.onCompleted();
      }
    }
  }
}