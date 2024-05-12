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
Vercel -> Push to 'main' branch
```

## Data

### BigQuery

Accessing data from LANCH's data warehouse about food orders, vendor data (dashboard content).

Hasura directly accesses BigQuery tables from the LANCH data warehouse. It has access to all tables in the dataset api_partner_dashboard. This dataset is dedicated to contain all tables with data relevant for the partner dashboard.

As such, if new data is needed to be accessed by the partner dashboard, a table (dbt model) in api_partner_dashboard should be created.

- Data transformation using dbt here to process data before queries:
  https://github.com/trycrumz/data-transformations/blob/main/models/reporting/api_partner_dashboard/api_pd_vendor_food_ratings.sql

## Outlook

- **Vendor <> Partner assignment process**: We need to protect the admin route in a way that only admin users can access it through their session, right now it’s protected for everybody and just accessible through state changes on the server-side.
- **Automated Onboarding**: Right now the vendor <> partner assignments are done manually by the tech team per partner (user). This process can be automated theoretically through matching vendor_id’s and unique partner identifiers (email, id, etc.).
- **Displaying new metrics**: Implementing charts and sections for reviews, ratings, issues.
- **User model for vendor list:** As of now we’re querying the vendor list based on the entire food_orders dataset and filter for the unique vendor_id’s, which is not only performance-wise very difficult, but as well requires the partner to have had at least one order already (which slows down the assignment process).
