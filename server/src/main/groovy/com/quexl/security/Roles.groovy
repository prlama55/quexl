package com.quexl.security

enum Roles {
  ROLE_SUPER_ADMIN("Super Admin"),
  ROLE_ADMIN("Admin"),
  ROLE_SELLER("Seller"),
  ROLE_BUYER("Buyer")
  String role
  Roles(String r){
    this.role= r
  }
}
