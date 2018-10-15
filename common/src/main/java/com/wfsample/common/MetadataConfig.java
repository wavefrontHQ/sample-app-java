package com.wfsample.common;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

/**
 * Service related metadata like application its part of and various customTags.
 *
 * @author Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public class MetadataConfig {

  /**
   * Application in which service is part of.
   */
  @Nonnull
  @JsonProperty
  private String application = "defaultApplication";

  /**
   * Name of the service.
   */
  @Nonnull
  @JsonProperty
  private String service = "defaultService";

  /**
   * Cluster where the service is running on.
   */
  @Nullable
  @JsonProperty
  private String cluster;

  /**
   * Shard where the service is running on.
   */
  @Nullable
  @JsonProperty
  private String shard;

  /**
   * Custom customTags for the service.
   */
  @Nullable
  @JsonProperty
  Map<String, String> customTags;

  @Nonnull
  public String getApplication() {
    return application;
  }

  @Nonnull
  public String getService() {
    return service;
  }

  @Nullable
  public String getCluster() {
    return cluster;
  }

  @Nullable
  public String getShard() {
    return shard;
  }

  @Nullable
  public Map<String, String> getCustomTags() {
    return customTags;
  }
}
