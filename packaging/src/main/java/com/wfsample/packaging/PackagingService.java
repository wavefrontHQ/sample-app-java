package com.wfsample.packaging;

import com.wfsample.beachshirts.PackagingGrpc;
import com.wfsample.beachshirts.PackedShirts;
import com.wfsample.beachshirts.WrapRequest;
import com.wfsample.common.GrpcServiceConfiguration;
import com.wfsample.common.BeachshirtsUtils;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.stub.StreamObserver;

/**
 * Driver for the packaging service which packs the a given shirt.
 *
 * @author Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public class PackagingService {

  public PackagingService(GrpcServiceConfiguration configuration) throws Exception {
    ServerBuilder builder = ServerBuilder.forPort(Integer.parseInt(configuration.getPort())).
        addService(new PackagingImpl());
    Server packaging = builder.build();
    System.out.println("Starting Packaging server ...");
    packaging.start();
    System.out.println("Packaging server started");
    packaging.awaitTermination();
  }

  public static void main(String[] args) throws Exception {
    GrpcServiceConfiguration configuration = BeachshirtsUtils.scenarioFromFile(args[0]);
    new PackagingService(configuration);
  }

  static class PackagingImpl extends PackagingGrpc.PackagingImplBase {

    @Override
    public void wrapShirts(WrapRequest request, StreamObserver<PackedShirts> responseObserver) {
      responseObserver.onNext(PackedShirts.newBuilder().
          addAllShirts(request.getShirtsList()).
          build());
      responseObserver.onCompleted();
    }
  }
}
