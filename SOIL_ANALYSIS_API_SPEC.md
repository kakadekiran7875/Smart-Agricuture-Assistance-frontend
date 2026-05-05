# Soil Analysis API Specification

## Overview
This document specifies the API endpoint required for the Soil Analysis feature in the Smart Agriculture Assistant application.

---

## Endpoint Details

### **POST /api/soil/analyze**

Analyzes soil quality based on pH level and organic carbon content.

---

## Request

### **URL**
```
POST http://10.232.236.239:5001/api/soil/analyze
```

### **Headers**
```
Content-Type: application/json
```

### **Request Body**
```json
{
  "ph": 6.5,
  "organicCarbon": 1.5
}
```

### **Parameters**

| Parameter | Type | Required | Range | Description |
|-----------|------|----------|-------|-------------|
| `ph` | Number | Yes | 0 - 14 | Soil pH level (neutral is ~7.0) |
| `organicCarbon` | Number | Yes | 0 - 10 | Organic carbon percentage in soil |

### **Validation Rules**
- `ph` must be between 0 and 14
- `organicCarbon` must be between 0 and 10
- Both values must be numeric (float/decimal allowed)

---

## Response

### **Success Response (200 OK)**

```json
{
  "soilQuality": "Good",
  "ph": 6.5,
  "organicCarbon": 1.5,
  "message": "Soil analysis completed successfully"
}
```

### **Response Fields**

| Field | Type | Description |
|-------|------|-------------|
| `soilQuality` | String | Overall soil quality rating |
| `ph` | Number | Echo of input pH value |
| `organicCarbon` | Number | Echo of input organic carbon value |
| `message` | String | Success message |

### **Possible `soilQuality` Values**

| Quality | Criteria |
|---------|----------|
| `"Excellent"` | pH: 6.5-7.0 AND Organic Carbon: >2.5% |
| `"Good"` | pH: 6.0-7.5 AND Organic Carbon: 1.5-2.5% |
| `"Fair"` or `"Moderate"` | pH: 5.5-8.0 AND Organic Carbon: 0.5-1.5% |
| `"Poor"` | pH: <5.5 or >8.0 OR Organic Carbon: <0.5% |

---

## Error Responses

### **400 Bad Request - Invalid Input**
```json
{
  "error": "Invalid input parameters",
  "message": "pH must be between 0 and 14"
}
```

### **400 Bad Request - Missing Fields**
```json
{
  "error": "Missing required fields",
  "message": "Both ph and organicCarbon are required"
}
```

### **500 Internal Server Error**
```json
{
  "error": "Internal server error",
  "message": "Failed to analyze soil data"
}
```

---

## Business Logic

### **pH Level Classification**

| pH Range | Classification | Soil Type |
|----------|----------------|-----------|
| < 5.5 | Highly Acidic | Needs lime treatment |
| 5.5 - 6.5 | Slightly Acidic | Good for most crops |
| 6.5 - 7.5 | Neutral | Optimal for agriculture |
| 7.5 - 8.5 | Slightly Alkaline | Suitable for specific crops |
| > 8.5 | Highly Alkaline | Needs sulfur treatment |

### **Organic Carbon Classification**

| Carbon % | Classification | Soil Health |
|----------|----------------|-------------|
| < 0.5% | Very Low | Poor soil health |
| 0.5% - 1.0% | Low | Needs organic matter |
| 1.0% - 2.0% | Medium | Moderate soil health |
| 2.0% - 3.0% | High | Good soil health |
| > 3.0% | Very High | Excellent soil health |

### **Overall Quality Algorithm**

```python
def calculate_soil_quality(ph, organic_carbon):
    # Excellent: Optimal pH and high organic carbon
    if 6.0 <= ph <= 7.5 and organic_carbon >= 2.5:
        return "Excellent"
    
    # Good: Near-optimal pH and moderate organic carbon
    elif 5.5 <= ph <= 8.0 and organic_carbon >= 1.5:
        return "Good"
    
    # Fair: Acceptable pH and low-moderate organic carbon
    elif 5.0 <= ph <= 8.5 and organic_carbon >= 0.5:
        return "Fair"
    
    # Poor: Extreme pH or very low organic carbon
    else:
        return "Poor"
```

---

## Example Requests

### **Example 1: Excellent Soil**
**Request:**
```bash
curl -X POST http://10.232.236.239:5001/api/soil/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "ph": 6.8,
    "organicCarbon": 2.8
  }'
```

**Response:**
```json
{
  "soilQuality": "Excellent",
  "ph": 6.8,
  "organicCarbon": 2.8,
  "message": "Soil analysis completed successfully"
}
```

### **Example 2: Poor Soil**
**Request:**
```bash
curl -X POST http://10.232.236.239:5001/api/soil/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "ph": 4.5,
    "organicCarbon": 0.5
  }'
```

**Response:**
```json
{
  "soilQuality": "Poor",
  "ph": 4.5,
  "organicCarbon": 0.5,
  "message": "Soil analysis completed successfully"
}
```

### **Example 3: Invalid Input**
**Request:**
```bash
curl -X POST http://10.232.236.239:5001/api/soil/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "ph": 15.0,
    "organicCarbon": 3.0
  }'
```

**Response:**
```json
{
  "error": "Invalid input parameters",
  "message": "pH must be between 0 and 14"
}
```

---

## Testing Checklist

- [ ] Endpoint accepts POST requests
- [ ] Validates pH range (0-14)
- [ ] Validates organic carbon range (0-10)
- [ ] Returns correct soil quality classification
- [ ] Handles missing fields gracefully
- [ ] Handles invalid data types
- [ ] Returns proper HTTP status codes
- [ ] CORS enabled for frontend domain
- [ ] Response time < 500ms

---

## Frontend Integration

The frontend is already implemented and ready. Once this API is deployed:

1. **Frontend URL:** `http://10.98.15.172/soil-analysis.html`
2. **API Call:** Automatically triggered when user submits the form
3. **Expected Behavior:** Results display with recommendations

---

## Priority & Timeline

**Priority:** Medium  
**Estimated Development Time:** 2-4 hours  
**Dependencies:** None  
**Frontend Status:** ✅ Complete and ready

---

## Contact

For questions or clarifications, please contact the frontend development team.

**Frontend Developer:** [Your Name]  
**Date:** October 11, 2025  
**Version:** 1.0
