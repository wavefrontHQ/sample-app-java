package com.wfsample.shopping;

import com.wfsample.common.BeachShirtsUtils;
import com.wfsample.common.DropwizardServiceConfig;
import com.wfsample.common.dto.DeliveryStatusDTO;
import com.wfsample.common.dto.OrderDTO;
import com.wfsample.common.dto.OrderStatusDTO;
import com.wfsample.common.dto.PackedShirtsDTO;
import com.wfsample.service.DeliveryApi;
import com.wfsample.service.StylingApi;

import java.util.UUID;

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
    String stylingUrl = "http://" + configuration.getStylingHost() + ":" + configuration
        .getStylingPort();
    String deliveryUrl = "http://" + configuration.getDeliveryHost() + ":" +
        configuration.getDeliveryPort();
    environment.jersey().register(new ShoppingWebResource(
        BeachShirtsUtils.createProxyClient(stylingUrl, StylingApi.class),
        BeachShirtsUtils.createProxyClient(deliveryUrl, DeliveryApi.class)));
  }

  @Path("/shop")
  @Produces(MediaType.APPLICATION_JSON)
  public class ShoppingWebResource {
    private final StylingApi stylingApi;
    private final DeliveryApi deliveryApi;

    public ShoppingWebResource(StylingApi stylingApi, DeliveryApi deliveryApi) {
      this.stylingApi = stylingApi;
      this.deliveryApi = deliveryApi;
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
      String orderNum = UUID.randomUUID().toString();
      PackedShirtsDTO packedShirts = stylingApi.makeShirts(
          orderDTO.getStyleName(), orderDTO.getQuantity());
      Response deliveryResponse = deliveryApi.dispatch(orderNum, packedShirts);
      DeliveryStatusDTO deliveryStatus = deliveryResponse.readEntity(DeliveryStatusDTO.class);
      return Response.status(deliveryResponse.getStatus()).entity(new OrderStatusDTO(orderNum,
          deliveryStatus.getStatus())).build();
    }
  }
}
