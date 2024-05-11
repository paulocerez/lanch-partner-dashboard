<div align="center">

<a href="https://partner.lanch.com/login"><img src="../partner-dashboard/public/logo.svg"></a>

# LANCH Partner Dashboard

The partner dashboard enables LANCH partners to track their most important operations metrics by accessing data from LANCH's data warehouse and other sources. It displays them in an easy-to-access way using cards and graphs, separating between different platforms.

</div>

## ⚡️ Quick start

How to run the dashboard locally:

- Fork the repo, install dependencies using "npm install" (or any other package manager)
- Rename .env.example into .env and get needed properties.
- Run locally by writing:

```console
npm run dev
```

## 🚀 Tech Stack

- Next.js, TypeScript: Built using Next.js and TS, including Next.js API Routes (App Router File system).
- Firebase: Authentication and user management provider.
- GraphQL/Apollo Client: Query language for APIs + server-side runtime for Query execution. Apollo Client as a state management library for JS, enabling management of local and remote data with GraphQL + usage of GraphQL queries and mutations for data operations.
- Vercel: Deployment and CI/CD pipeline.
- Tremor: React library to build dashboards fast.
- Hasura (APIs): No-code tool ensuring deployment and integration of GraphQL APIs. Queries based on data from GCP and BigQuery.
- GCP: Postgres instance containing administrative data.
- BigQuery: Data warehouse containing vendor and order related data.
- dbt: Data transformation tool in data warehouses.

## CI/CD

```console
Vercel
```

## Data

### BigQuery

- Accessing data from LANCH's data warehouse about food orders and vendor data
- Data transformation using dbt here to process data before queries:
  https://github.com/trycrumz/data-transformations/blob/main/models/reporting/api_partner_dashboard/api_pd_vendor_food_ratings.sql

### Google Cloud Platform

-

## Outlook
