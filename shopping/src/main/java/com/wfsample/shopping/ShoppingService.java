package com.wfsample.shopping;

import com.wfsample.common.BeachShirtsUtils;
import com.wfsample.common.DropwizardServiceConfig;
import com.wfsample.common.dto.OrderDTO;
import com.wfsample.service.StylingApi;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;
import org.jboss.resteasy.client.jaxrs.engines.ApacheHttpClient4Engine;
import org.jboss.resteasy.plugins.providers.jackson.ResteasyJackson2Provider;
import org.jboss.resteasy.spi.ResteasyProviderFactory;

import java.util.concurrent.TimeUnit;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.dropwizard.Application;
import io.dropwizard.setup.Environment;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * Driver for Shopping service provides consumer facing APIs supporting activities like browsing
 * different styles of beachshirts, and ordering beachshirts.
 *
 * @author Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public class ShoppingService extends Application<DropwizardServiceConfig> {
  private DropwizardServiceConfig configuration;

  private ShoppingService() {

  }

  public static void main(String[] args) throws Exception {
    new ShoppingService().run(args);
  }

  @Override
  public void run(DropwizardServiceConfig configuration, Environment environment)
      throws Exception {
    this.configuration = configuration;
    String url = "http://localhost:" + configuration.getStylingPort();
    environment.jersey().register(new ShoppingWebResource(
        BeachShirtsUtils.createProxyClient(url, StylingApi.class)));
  }

  @Path("/shop")
  @Produces(MediaType.APPLICATION_JSON)
  public class ShoppingWebResource {
    private final StylingApi stylingApi;

    public ShoppingWebResource(StylingApi stylingApi) {
      this.stylingApi = stylingApi;
    }

    @GET
    @Path("/menu")
    public Response getShoppingMenu(@Context HttpHeaders httpHeaders) {
      return Response.ok(stylingApi.getAllStyles()).build();
    }

    @POST
    @Path("/order")
    @Consumes(APPLICATION_JSON)
    public Response orderShirts(OrderDTO orderDTO, @Context HttpHeaders httpHeaders) {
      return Response.ok(
          stylingApi.makeShirts(orderDTO.getStyleName(), orderDTO.getQuantity())).build();
    }
  }
}
