package com.wfsample.shopping;

import com.wfsample.common.DropwizardServiceConfig;
import com.wfsample.common.dto.OrderDTO;
import com.wfsample.common.dto.OrderStatusDTO;
import com.wfsample.common.dto.ShirtStyleDTO;

import java.util.HashMap;
import java.util.Map;
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
import okhttp3.OkHttpClient;

import static com.wfsample.common.BeachShirtsUtils.httpGet;
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
    environment.jersey().register(new ShoppingWebResource());
  }

  @Path("/shop")
  @Produces(MediaType.APPLICATION_JSON)
  public class ShoppingWebResource {
    private OkHttpClient client;

    public ShoppingWebResource() {
      this.client = new OkHttpClient().newBuilder().readTimeout(2, TimeUnit.MINUTES).build();
    }

    @GET
    @Path("/menu")
    public Response getShoppingMenu(@Context HttpHeaders httpHeaders) {
      ShirtStyleDTO[] styles = httpGet(client, "localhost", configuration.getStylingPort(),
          "style", null, ShirtStyleDTO[].class, "getAlStyles");
      return Response.ok(styles).build();
    }

    @POST
    @Path("/order")
    @Consumes(APPLICATION_JSON)
    public Response orderShirts(OrderDTO orderDTO, @Context HttpHeaders httpHeaders) {
      Map<String, String> queryParameters = new HashMap<>();
      queryParameters.put("quantity", Integer.toString(orderDTO.getQuantity()));
      OrderStatusDTO statusDTO = httpGet(client, "localhost", configuration.getStylingPort(),
          "style/" + orderDTO.getStyleName() + "/make", queryParameters, OrderStatusDTO.class,
          "makeShirts");
      return Response.ok(statusDTO).build();
    }
  }
}
