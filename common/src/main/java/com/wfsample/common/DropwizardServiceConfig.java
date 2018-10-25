package com.wfsample.common;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.dropwizard.Configuration;

/**
 * Dropwizard based service configurtion.
 *
 * @author Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public class DropwizardServiceConfig extends Configuration {

  /**
   * Port on which the styling service is running.
   */
  @JsonProperty
  private int stylingPort = 50051;

  /**
   * Port on which printing service is running.
   */
  @JsonProperty
  private int printingPort = 50052;

  /**
   * Port on which packaging service is running.
   */
  @JsonProperty
  private int packagingPort = 50053;

  /**
   * Host on which the styling service is running.
   */
  @JsonProperty
  private String stylingHost = "stylingService";

  /**
   * Host on which the styling service is running.
   */
  @JsonProperty
  private String printingHost = "printingService";

  /**
   * Host on which the styling service is running.
   */
  @JsonProperty
  private String packagingHost = "packagingService";

  public int getStylingPort() {
    return stylingPort;
  }

  public int getPrintingPort() {
    return printingPort;
  }

  public int getPackagingPort() {
    return packagingPort;
  }

  public String getStylingHost() {
    return stylingHost;
  }

  public String getPrintingHost() {
    return printingHost;
  }

  public String getPackagingHost() {
    return packagingHost;
  }
}
