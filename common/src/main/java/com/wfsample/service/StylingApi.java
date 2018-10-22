package com.wfsample.service;

import com.wfsample.common.dto.OrderStatusDTO;
import com.wfsample.common.dto.ShirtStyleDTO;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("/style")
@Produces(MediaType.APPLICATION_JSON)
public interface StylingApi {

  @GET
  List<ShirtStyleDTO> getAllStyles();

  @GET
  @Path("{id}/make")
  @Consumes(MediaType.APPLICATION_JSON)
  OrderStatusDTO makeShirts(@PathParam("id") String id, @QueryParam("quantity") int quantity);
}
