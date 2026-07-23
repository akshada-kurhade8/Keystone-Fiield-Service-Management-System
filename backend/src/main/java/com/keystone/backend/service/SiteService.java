package com.keystone.backend.service;

import java.util.List;

import com.keystone.backend.dto.SiteRequest;
import com.keystone.backend.entity.Site;

public interface SiteService {

    String addSite(SiteRequest request);
    List<Site> getAllSites();
    String deleteSite(Long id);
    String updateSite(Long id, SiteRequest request);

}
