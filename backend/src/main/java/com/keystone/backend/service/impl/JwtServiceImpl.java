package com.keystone.backend.service.impl;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import com.keystone.backend.service.JwtService;

@Service
public class JwtServiceImpl implements JwtService {
	
	@Value("${jwt.secret}")
	private String secretKey;

	@Value("${jwt.expiration}")
	private long expiration;

	@Override
	public String generateToken(String email) {

	    Key key = new SecretKeySpec(
	            secretKey.getBytes(StandardCharsets.UTF_8),
	            SignatureAlgorithm.HS256.getJcaName());

	    return Jwts.builder()
	            .subject(email)
	            .issuedAt(new Date())
	            .expiration(new Date(System.currentTimeMillis() + expiration))
	            .signWith(key)
	            .compact();
	}

	@Override
	public String extractUsername(String token) {

	    return Jwts.parser()
	            .verifyWith(new SecretKeySpec(
	                    secretKey.getBytes(StandardCharsets.UTF_8),
	                    SignatureAlgorithm.HS256.getJcaName()))
	            .build()
	            .parseSignedClaims(token)
	            .getPayload()
	            .getSubject();
	}

	@Override
	public boolean isTokenValid(String token, String email) {

	    String username = extractUsername(token);

	    return username.equals(email);
	}
}