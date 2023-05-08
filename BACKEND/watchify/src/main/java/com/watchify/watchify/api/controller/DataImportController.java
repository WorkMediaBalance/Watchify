package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.CsvImporterService;
import com.watchify.watchify.api.service.MainScheduleService;
import com.watchify.watchify.dto.response.CalenderDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/dataImport/")
@RequiredArgsConstructor
public class DataImportController {

    private final CsvImporterService csvImporterService;

    @GetMapping("/content")
    public String ImportCsv() {
        csvImporterService.importCsv();
        return "CSV data imported successfully!";
    }

}

