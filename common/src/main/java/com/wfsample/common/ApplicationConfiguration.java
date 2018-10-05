package com.wfsample.common;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.hibernate.validator.constraints.NotEmpty;

import java.util.Map;

import io.dropwizard.Configuration;

/**
 * Dropwizard based service configurtion.
 *
 * @author Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public class ApplicationConfiguration extends Configuration {

  @NotEmpty
  private String host = "localhost";

  @NotEmpty
  private String port = "2878";

  private int stylingPort = 50051;

  private int printingPort = 50052;

  private int packagingPort = 50053;

  @NotEmpty
  private String application = "defaultApplication";

  private String cluster;

  @NotEmpty
  private String service = "defaultService";

  private String shard;

  private Map<String, String> tags;

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

  @JsonProperty
  public int getStylingPort() {
    return stylingPort;
  }

  @JsonProperty
  public void setStylingPort(int stylingPort) {
    this.stylingPort = stylingPort;
  }

  @JsonProperty
  public int getPrintingPort() {
    return printingPort;
  }

  @JsonProperty
  public void setPrintingPort(int printingPort) {
    this.printingPort = printingPort;
  }

  @JsonProperty
  public int getPackagingPort() {
    return packagingPort;
  }

  @JsonProperty
  public void setPackagingPort(int packagingPort) {
    this.packagingPort = packagingPort;
  }
}
