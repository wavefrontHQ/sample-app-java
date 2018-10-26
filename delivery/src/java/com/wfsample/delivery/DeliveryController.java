package com.wfsample.delivery;

import com.wfsample.common.dto.ShirtDTO;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

/**
 * Controller for delivery service which is responsible for dispatching shirts returning tracking
 * number for a given order.
 *
 * @author Hao Song (songhao@vmware.com).
 */
@Path("/delivery")
@Produces(MediaType.APPLICATION_JSON)
public class DeliveryController {

  @POST
  @Path("{orderNum}")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response dispatch(@PathParam("orderNum") String orderNum, List<ShirtDTO> shirts,
                           @Context HttpHeaders httpHeaders) {
    if (shirts == null || shirts.size() == 0) {
      return Response.status(Response.Status.BAD_REQUEST).entity("No shirt to delivery").build();
    }
    String trackingNum = UUID.randomUUID().toString();
    System.out.println("Tracking number of Order:" + orderNum + " is " + trackingNum);
    return Response.ok(trackingNum).build();
  }

}
