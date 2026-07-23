//package com.keystone.backend.dto;
//
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//public class LoginRequest {
//
//    private String email;
//    private String password;
//
//}

package com.keystone.backend.dto;

public class LoginRequest {

    private String email;
    private String password;
    
    public LoginRequest() {
    	
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}