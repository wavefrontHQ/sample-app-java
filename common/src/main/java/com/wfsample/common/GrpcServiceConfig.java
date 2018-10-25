package com.wfsample.common;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * gRPC based service configuration.
 *
 * Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public class GrpcServiceConfig {

  /**
   * Port on which gRPC service will run on.
   */
  @JsonProperty
  private int grpcPort = 0;

  public int getGrpcPort() {
    return grpcPort;
  }
}
