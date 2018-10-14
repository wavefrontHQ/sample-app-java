package com.wfsample.common;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Nonnull;

/**
 * gRPC based service configuration.
 *
 * Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public class GrpcServiceConfiguration {

  /**
   * Port on which gRPC service will run on.
   */
  @JsonProperty
  private int grpcPort = 0;

  /**
   * Metadata associated with a specific instance of a service.
   */
  @Nonnull
  @JsonProperty
  private MetadataConfiguration metadata = new MetadataConfiguration();

  public int getGrpcPort() {
    return grpcPort;
  }

  @Nonnull
  public MetadataConfiguration getMetadata() {
    return metadata;
  }
}
