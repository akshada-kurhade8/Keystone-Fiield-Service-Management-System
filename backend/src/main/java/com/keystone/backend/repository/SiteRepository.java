package com.keystone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.keystone.backend.entity.Site;

public interface SiteRepository extends JpaRepository<Site, Long> {

}