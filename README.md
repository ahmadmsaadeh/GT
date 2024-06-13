# GreenThumb - Empowering Urban Gardening and Sustainable Living

## Overview

GreenThumb is a backend API designed to promote urban gardening, sustainable living, and community-driven food production. The platform serves as a hub for individuals, communities, and organizations to collaborate, share knowledge, and access resources related to urban gardening and sustainable living practices.

## Table of Contents

- [Introdaction](#project-introdaction)
- [Project Aim](#project-aim)
- [Core Features](#core-features)
- [API Documentation](#api-documentation)
- [External API Integration](#external-api-integration)
- [Technologies Used](#technologies-used)
- [Testing](#Testing)
- [Getting Started](#getting-started)
- [Vision](#Vision)
  

## Introdaction 

Welcome to GreenThumb, an API designed to empower urban gardening and promote sustainable living. GreenThumb provides a robust backend for a platform that serves as a hub for individuals, communities, and organizations involved in urban gardening and sustainable practices. Our goal is to facilitate collaboration, knowledge sharing, and resource access to help people grow their own food, and live more sustainably.

## Project Aim

The aim of GreenThumb is to develop a robust backend API that facilitates:
- Collaboration among urban gardeners.
- Sharing of gardening knowledge and resources.
- Coordination of community gardening activities.
- Integration with external data sources for enhanced decision-making.

## Core Features

1. **Community Gardens:** 
   - Directory of community gardens with locations, available plots, and specific growing conditions.
   
2. **Crop Planning and Tracking:** 
   - Tools for planning and tracking gardening activities, including crop rotations, planting schedules, and harvest records.
   
3. **Knowledge Sharing:** 
   - Curated library of gardening guides, tutorials, and best practices contributed by experienced gardeners and organizations.
   
4. **Resource Exchange:** 
   - Platform for exchanging or sharing gardening resources such as tools, seeds, compost, and surplus produce.
   
5. **Volunteer Coordination:** 
   - Coordination of volunteers for community garden maintenance, events, and educational workshops.
   
6. **Local Partnership Integration:** 
   - Integration with local nurseries, farms, and organizations to promote their products, services, and events.

## API Documentation
The API is fully documented using Postman. Access the documentation [here](https://github.com/ahmadmsaadeh/GT/wiki) .


## External API Integration

- **Weather and Climate Data:** Integration with weather APIs to provide accurate local climate data.
- **Soil and Pest Management Resources:** Connection with authoritative sources for soil analysis data, pest identification, and organic pest control methods.

## Technologies Used

- **Backend:** Node.js: Backend development platform, Express.js
- **Database:** MySQL: Database for CRUD operations.
- **Postman:** API building, testing and documentation tool.
- **Version Control:** Git: Version control system.
  
## Testing
-**Postman** Testing Strategy
We have employed Postman for comprehensive API testing to ensure the functionality, reliability, and accuracy of the Greenthumb platform. Our testing strategy involves:

-**Automated Tests:** Writing automated test scripts within Postman to perform API endpoint testing, covering scenarios for data submission.

-**Environment Setup:** Configuring different environments within Postman to simulate various conditions and perform thorough testing.

-**Collection Runs:** Executing collection runs in Postman to validate endpoints, data validations, authentication mechanisms, and error handling.

**Instructions for Testing Using Postman**:

Import the provided Postman collection.
Set up the necessary environment variables, choose the Postman file.
Run collection tests individually or perform a collection run to test various API endpoints.

## Getting Started

To get started with GreenThumb API, follow these steps:
- Clone the repository:
git clone `https://github.com/ahmadmsaadeh/GT.git`
- Install dependencies:`npm install`
- Configure environment variables.
- Setup the database using mysql ( sql code is inside database folder ).
- Run the application: `npm start`

## Vision

At GreenThumb, our vision is to transform urban environments into thriving, sustainable ecosystems by empowering communities to engage in urban gardening and sustainable living practices. We believe that by fostering collaboration, sharing knowledge, and providing access to essential resources, we can make a significant impact on the way people interact with their urban surroundings.

