package com.wfsample.printing;

import com.wfsample.beachshirts.PrintRequest;
import com.wfsample.beachshirts.PrintingGrpc;
import com.wfsample.beachshirts.Shirt;
import com.wfsample.common.BeachShirtsUtils;
import com.wfsample.common.GrpcServiceConfig;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.stub.StreamObserver;

/**
 * Driver for the printing service which prints a shirt of given style.
 *
 * @author Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public class PrintingService {

  public PrintingService(GrpcServiceConfig config) throws Exception {
    ServerBuilder builder = ServerBuilder.forPort(config.getGrpcPort()).
        addService(new PrintingImpl(config));
    Server printingServer = builder.build();
    System.out.println("Starting printing server");
    printingServer.start();
    System.out.println("Started printing server");
    printingServer.awaitTermination();
  }

  public static void main(String[] args) throws Exception {
    GrpcServiceConfig conf = BeachShirtsUtils.scenarioFromFile(args[0]);
    new PrintingService(conf);
  }

  static class PrintingImpl extends PrintingGrpc.PrintingImplBase {
    private final GrpcServiceConfig conf;

    public PrintingImpl(GrpcServiceConfig grpcServiceConfig) {
      this.conf = grpcServiceConfig;
    }

    @Override
    public void printShirts(PrintRequest request, StreamObserver<Shirt> responseObserver) {
      for (int i = 0; i < request.getQuantity(); i++) {
        responseObserver.onNext(Shirt.newBuilder().setStyle(request.getStyleToPrint()).build());
      }
      responseObserver.onCompleted();
    }
  }
}
