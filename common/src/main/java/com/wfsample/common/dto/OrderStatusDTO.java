package com.wfsample.common.dto;

/**
 * DTO for a beachshirts order status.
 *
 * @author Srujan Narkedamalli (snarkedamall@wavefront.com).
 */
public class OrderStatusDTO {
  String status;

  public OrderStatusDTO() {
  }

  public OrderStatusDTO(String status) {
    this.status = status;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String statusMessage) {
    this.status = statusMessage;
  }
}
