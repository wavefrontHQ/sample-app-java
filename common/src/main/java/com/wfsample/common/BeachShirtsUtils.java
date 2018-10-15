package com.wfsample.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.fasterxml.jackson.dataformat.yaml.YAMLParser;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.annotation.Nullable;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Utilities for use by the various beachshirts application related services.
 *
 * @author Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public final class BeachShirtsUtils {

  private BeachShirtsUtils() {
  }

  public static <V> V httpGet(OkHttpClient client, String host, int port, String pathSegments,
                              @Nullable Map<String, String> queryParameters,
                              Class<V> responseType, String operationName) {
    HttpUrl.Builder urlBuilder = new HttpUrl.Builder().scheme("http").host(host).port(port).
        addPathSegments(pathSegments);
    if (queryParameters != null) {
      for (Map.Entry<String, String> parameter : queryParameters.entrySet()) {
        urlBuilder.addQueryParameter(parameter.getKey(), parameter.getValue());
      }
    }
    HttpUrl url = urlBuilder.build();
    Request.Builder requestBuilder = new Request.Builder().url(url);
    Request request = requestBuilder.build();
    try {
      Response response = client.newCall(request).execute();
      if (response.code() != 200) {
        response.close();
        throw new RuntimeException("Bad HTTP result: " + response);
      }
      ObjectMapper mapper = new ObjectMapper();
      return mapper.readValue(response.body().bytes(), responseType);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public static GrpcServiceConfig scenarioFromFile(String file) throws IOException {
    File configFile = new File(file);
    GrpcServiceConfig config;
    if (configFile.exists()) {
      YAMLFactory factory = new YAMLFactory(new ObjectMapper());
      YAMLParser parser = factory.createParser(configFile);
      config = parser.readValueAs(GrpcServiceConfig.class);
    } else {
      config = new GrpcServiceConfig();
    }
    return config;
  }
}
