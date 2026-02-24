---
title: "Migrazione Cloud per Acme Corp"
date: 2025-06-15
draft: false
summary: "Migrazione di 50+ servizi da on-premise ad AWS con zero downtime."
technologies: ["AWS", "Terraform", "Docker", "GitHub Actions"]
client: "Acme Corp"
duration: "6 mesi"
weight: 1
---

## La sfida

Acme Corp gestiva la propria infrastruttura su server fisici in un data center locale. Con la crescita del business, i costi di manutenzione e i tempi di provisioning erano diventati insostenibili.

## La soluzione

Ho progettato e implementato una strategia di migrazione lift-and-shift seguita da una fase di ottimizzazione cloud-native:

- **Assessment**: Analisi di 50+ servizi e relative dipendenze
- **Architettura**: Design di una landing zone AWS con VPC, subnet, e security groups
- **IaC**: Tutta l'infrastruttura gestita con Terraform
- **CI/CD**: Pipeline automatizzate con GitHub Actions per ogni servizio
- **Monitoring**: Stack di osservabilità con CloudWatch, Prometheus e Grafana

## Risultati

- **Zero downtime** durante la migrazione
- **40% riduzione** dei costi infrastrutturali
- **Provisioning** da settimane a minuti
- **Compliance** GDPR mantenuta durante tutto il processo
