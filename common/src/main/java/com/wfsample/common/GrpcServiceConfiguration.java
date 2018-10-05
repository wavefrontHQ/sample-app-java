package com.wfsample.common;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.hibernate.validator.constraints.NotEmpty;

import java.util.HashMap;
import java.util.Map;

/**
 * gRPC based service configuration.
 *
 * Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public class GrpcServiceConfiguration {

  @NotEmpty
  private String host = "localhost";

  @NotEmpty
  private String port = "2878";

  @NotEmpty
  private String application = "defaultApplication";

  private String cluster = "defaultCluster";

  public void setService(String service) {
    this.service = service;
  }

  @NotEmpty
  private String service = "defaultService";

  private String shard = "deafultShard";

  private Map<String, String> tags = new HashMap<>();

  @JsonProperty
  public String getHost() {
    return host;
  }

  @JsonProperty
  public String getPort() {
    return port;
  }

  @JsonProperty
  public String getApplication() {
    return application;
  }

  @JsonProperty
  public String getCluster() {
    return cluster;
  }

  @JsonProperty
  public String getService() {
    return service;
  }

  @JsonProperty
  public String getShard() {
    return shard;
  }

  @JsonProperty
  public Map<String, String> getTags() {
    return tags;
  }
}
