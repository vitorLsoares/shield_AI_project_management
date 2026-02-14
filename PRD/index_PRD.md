# Shield AI Security — PRD Base (MVP → Beta)
**Version:** v3.0 (Base)
**Date:** 2026-02-12
**Status:** Ready for Implementation (MVP baseline)

> Este PRD é a **fonte de verdade** para as próximas documentações (ARD, Design Spec, QA Plan, Growth Spec).  
> Objetivo do MVP: **adoção massiva** (Free sem fricção) + **base de inteligência** (dataset seguro) + monetização futura por **feature gating**.

---

## 1. Executive Summary

### 1.1 Problema (Jobs-to-be-Done)
Quando eu recebo um link/mensagem/imagem suspeita, eu quero entender rapidamente se é golpe e o que fazer, para não perder dinheiro nem expor meus dados — sem precisar ser especialista.

### 1.2 Solução (em 2–3 frases)
Shield AI Security analisa **URLs, mensagens e evidências visuais (Premium)** e retorna um veredito compreensível (com sinais e recomendações práticas).  
O sistema prioriza **explicação** e **segurança do usuário**, com **degradação graciosa** (UNCERTAIN) quando não há confiança suficiente.

### 1.3 Metas de sucesso (MVP)
**Valor ao usuário**
- TTFV (tempo até veredito): **p50 ≤ 10s**, **p95 ≤ 25s**
- Linguagem: explicações claras e acionáveis (checklist de ação)

**Operação / custo**
- Forte uso de cache (TTL 48h) para reduzir reprocessamento e custo por análise
- Anti-abuso por rate-limit e detecção simples (sem quotas diárias no Free)

**Qualidade (medida por amostragem rotulada)**
- Reduzir risco de falsos negativos; quando houver dúvida → **UNCERTAIN**
- Métricas FP/FN calculadas com **ground truth por painel interno** (ver §8)

---

## 2. Estratégia do Produto

### 2.1 Princípios
1) **Confiança vem do entendimento**, não do score.
2) **Apoio à decisão**, não “sentença”.
3) **Segurança por padrão**: não armazenar conteúdo sensível desnecessário.
4) **Adoção massiva no Free**, monetização por **features**.

### 2.2 Tiers e Monetização (Feature Gating — MVP)
**Free (ilimitado em volume; sujeito a rate limit anti-abuso)**
- ✅ URL Check (paste/share-in)
- ✅ Message Checklist (texto colado)
- ✅ Veredito compartilhável (texto/“card”)

**Assinante (Premium)**
- ✅ QR Scan (análise do destino)
- ✅ OCR + Vision Screenshot/Image Analysis (texto + detecção visual)
- (Futuro) alertas proativos, histórico, integrações, etc.

**Regras de Paywall**
- Features Premium ficam **visíveis** (vitrine), porém **bloqueadas** no Free.
- Paywall aparece **na ação** (quando tentar usar QR/OCR).
- **Sem teste grátis** de QR/OCR no MVP.

### 2.3 Acesso e Captura de Contato (MVP)
- Uso Free: **sem login** (anônimo).
- Após **todo** veredito: CTA opcional para capturar **e-mail/WhatsApp** (newsletter/dicas/novidades).
- CTA **não bloqueia** o fluxo e não altera o veredito.
- Assinatura: ativada via checkout web (Stripe **ou AbacatePay**) vinculada a identificador do checkout (e-mail/telefone).

---

## 3. Público-alvo e Casos de Uso

## Personas (Validated + Expansion)

### Primary — Usuário Cauteloso (Everyday User)
- Usa WhatsApp/Instagram, compra online, Pix, baixa familiaridade técnica
- **Needs:** resposta clara e rápida + próxima ação
- **JTBD:** "Quando recebo link suspeito, quero saber se é seguro sem precisar entender tecnicamente, para decidir rápido e evitar golpe"

### Secondary — "A Pessoa que Protege a Família" (Family Safety Helper)
- Ajuda pais/parceiro/grupos de família a validar links e mensagens
- **Needs:** veredito compartilhável + linguagem educacional + roteiro de verificação
- **JTBD:** "Quando minha mãe recebe link, quero validar para ela e explicar de forma simples, para proteger minha família"

### Tertiary (pós-MVP) — Microempreendedor/Vendedor
- Recebe cobranças, notas, links de pagamento e tentativas de impersonation
- **Needs:** reduzir risco de fraude de cobrança/pagamento + verificação de remetente
- **JTBD:** "Quando recebo cobrança/pedido suspeito, quero validar antes de pagar, para não perder dinheiro do negócio"

### 3.2 Workflows principais (MVP)
1) **URL Check**
   - Usuário cola/compartilha um link → veredito + motivos + checklist.
2) **Message Checklist**
   - Usuário cola texto → sistema detecta sinais e extrai URLs → retorna risco da mensagem e dos links.
3) **Shareable Verdict**
   - Usuário compartilha o resultado com família/amigos para evitar que outras pessoas caiam no golpe.
4) **Premium: QR**
   - Usuário escaneia QR → resolve destino → pipeline de URL.
5) **Premium: OCR/Vision**
   - Usuário envia screenshot/foto → extrai texto + identifica elementos visuais relevantes → veredito.

---

## 4. Definições e Taxonomia de Veredito

### 4.1 Outputs (MVP)
- **Verdict Class (obrigatório):**
  - **HIGH RISK** (provável golpe)
  - **LOW RISK** (sem sinais relevantes, mas não “garantia”)
  - **UNCERTAIN** (insuficiente/confiança baixa/timeout/provider failure)

- **Scores (0–100%)**
  - Para URL Check: `url_risk_pct`
  - Para Message Checklist: `message_risk_pct` e `url_risk_pct` por link (se houver)

### 4.2 Regra de UNCERTAIN (guardrail)
Retornar **UNCERTAIN** quando:
- Tempo total exceder **25s** (p95 budget)
- Falha de providers e heurísticas insuficientes
- Evidência conflitante sem corroboração
- URL não resolvível / redirect chain excedida

### 4.3 Regra “2 sinais independentes”
- Veredito HIGH RISK exige:
  - **(i)** 2 sinais independentes, **ou**
  - **(ii)** 1 sinal crítico + 1 corroborador, **ou**
  - **(iii)** 2 sinais críticos (alto risco direto)

---

## 5. Sinais de Risco (Risk Signals) — v0 (MVP)

### 5.1 Sinais Críticos (v0)
Qualquer 1 sinal crítico + 1 corroborador → HIGH RISK.  
Dois sinais críticos → HIGH RISK direto.

1) **Domínio recém-criado**: idade < **30 dias**
2) **Typosquatting / similaridade de marca**: similaridade ≥ **0.82**
3) **Redirect chain anômala**: ≥ 3 redirects com troca de domínio + encurtador no meio
4) **Reputação muito ruim em provider**: abaixo do threshold do provider
5) **Padrão Pix/urgência + impersonation** (Message/OCR):
   - (Pix OR “chave”) AND (urgência OR ameaça) AND (marca/banco citado)

### 5.2 Corroboradores (v0)
- TLD incomum para a marca (ex.: `.top`, `.xyz`, etc.)
- Path/padrão típico: `/login`, `/verify`, `/secure`, `/account`
- Query params incomuns / tracking suspeito fora dos padrões
- Host/infra com histórico de abuso (quando provider informar)
- SSL/TLS ausente ou inconsistente (quando disponível)

### 5.3 Score → Classe (MVP)
- `risk_pct >= 70` → HIGH RISK (se regra de sinais atendida)
- `risk_pct <= 30` → LOW RISK (sem sinais críticos)
- Caso contrário → UNCERTAIN (ou LOW/HIGH conforme sinais; regra de sinais prevalece)

> Observação: thresholds podem ser ajustados por telemetria, mas mudanças devem ser versionadas.

---

## 6. Requisitos Funcionais (MVP) + Critérios de Aceite

### 6.1 URL Check (Free) — MUST
**Descrição**
- Input: URL colada/compartilhada.
- Pipeline:
  1) Normalização e dedupe (hash)
  2) Cache lookup (TTL 48h)
  3) Redirect resolution (limite N)
  4) Providers + heurísticas locais + agregação
  5) Explicação + checklist
  6) (Opcional) CTA de contato

**Decisões**
- Redirect limit **N = 5**
- Timeout total: **>25s → UNCERTAIN**

**ACs**
- AC1: Normaliza URL de forma determinística (ver §7.1).
- AC2: Cache hit retorna veredito sem reprocessar.
- AC3: Cache miss executa pipeline e persiste resultado agregado (sem PII).
- AC4: Retorna `url_risk_pct` + classe + evidências (mín. 2 itens quando HIGH).
- AC5: Se exceder 25s → `UNCERTAIN` com motivo `timeout`.

### 6.2 Message Checklist (Free) — MUST
**Descrição**
- Input: texto colado (WhatsApp/SMS/e-mail).
- Pipeline:
  1) Extração de sinais (Pix, urgência, ameaça, impersonation, pedido de dados)
  2) Extração de URLs do texto (0..n)
  3) Para cada URL: executar URL Check (com cache)
  4) Retornar dois resultados:
     - `message_risk_pct` (0–100)
     - `url_risk_pct` por link (0–100), se houver

**ACs**
- AC1: Extrai sinais com flags estruturadas (sem persistir o texto bruto).
- AC2: Extrai URLs com normalização.
- AC3: Retorna `message_risk_pct` e, se houver links, lista com `url_risk_pct`.
- AC4: Explicação separa “por que a mensagem é suspeita” vs “por que o link é suspeito”.

### 6.3 Veredito Compartilhável (Free) — MUST
**Descrição**
- Gera um “card” textual para compartilhar em apps (WhatsApp/Instagram/etc.).

**Regras de privacidade (v0)**
- Não incluir URL completa.
- Exibir apenas **domínio** + data/hora + veredito + 2–4 evidências.
- Remover e-mails, telefones, números de documentos, chaves Pix (se detectados).

**ACs**
- AC1: “Share” gera conteúdo consistente e legível.
- AC2: PII mascarada conforme regra v0.
- AC3: Evento de share registrado.

### 6.4 QR Scan (Premium) — SHOULD (entrega no MVP Premium)
**Descrição**
- Scanner QR → resolver URL destino → pipeline URL.

**Regras**
- Free: feature visível e bloqueada (paywall na ação).
- Sem “trial” no MVP.

**ACs**
- AC1: Resolve destino e aplica normalização.
- AC2: Paywall aparece corretamente para Free.
- AC3: Premium executa e retorna veredito completo.

### 6.5 OCR + Vision Screenshot/Image Analysis (Premium) — SHOULD (MVP Premium)
**Descrição**
- Input: imagem/screenshot.
- Pipeline:
  1) OCR (texto)
  2) Vision: detectar elementos relevantes (ex.: marca/banco, padrões de golpe)
  3) Extrair URLs do texto (quando houver) → URL pipeline
  4) Retornar `message_risk_pct` + `url_risk_pct` (se houver links)

**ACs**
- AC1: Não persistir imagem por padrão.
- AC2: Retorna explicação combinando evidência textual e visual.
- AC3: Paywall para Free.

### 6.6 Fora do MVP (explicitamente Post-MVP)
- Histórico visível ao usuário
- Feedback do usuário (para evitar contaminação do dataset)
- Relatório LGPD automatizável (export) — Beta/GA
- Extensões de navegador / integrações

---

## 7. Requisitos Não-Funcionais

### 7.1 Normalização de URL (v0) — MUST
- Lowercase do host
- Remover `www.`
- Remover trailing `/`
- Remover fragment `#...`
- Ordenar query params
- Remover tracking params: `utm_*`, `gclid`, `fbclid`, `igshid` (lista configurável)
- Converter IDN para ASCII (punycode)

**Cache Key**
- `hash(normalized_url)` (ou domínio+path conforme estratégia)

### 7.2 Performance e Timeouts — MUST
- p50 ≤ 10s; p95 ≤ 25s
- Timeout total > 25s → UNCERTAIN
- Redirect resolution: objetivo ≤ 4s
- Budgets por provider: **definidos no ARD** (guardrail é o total)

### 7.3 Confiabilidade / Disponibilidade
- SLO MVP: **99.5% mensal** (backend de veredito)
- Graceful degradation: quando provider falhar → fallback; se insuficiente → UNCERTAIN

### 7.4 Segurança
- Secrets em **vault** (não apenas env vars) — MUST
- Kill switch global e por provider — MUST
- Logs sem PII e sem payloads sensíveis por padrão

### 7.5 Anti-abuso (sem quotas no Free)
- Rate limit por IP/device/user-anônimo:
  - sugestão v0: 10 req/min por IP (burst 20) e 60 req/h por IP (ajustável por telemetria)
- Detecção simples: padrões de bot (alto volume, repetição, user-agent anômalo)

---

## 8. Dados, Privacidade e LGPD

### 8.1 Armazenamento (MVP)
**Guardar**
- hash da URL normalizada / domínio
- sinais/features (flags) e evidências agregadas
- veredito + scores + timestamps
- métricas/eventos

**Não guardar (por padrão)**
- texto integral das mensagens
- URL completa em claro
- imagens/screenshot
- qualquer PII desnecessário

### 8.2 Cache e Reuso (MVP)
- Cache TTL: **48h**
- Objetivo: retornar rápido para golpes já analisados, reduzindo custo e latência
- “Já analisado” pode ser indicado ao usuário sem expor URL completa

### 8.3 Retenção
- Retenção de logs/telemetria: **30 dias**

### 8.4 Direitos do usuário (MVP)
- **Delete-on-request <24h** + registro auditável (data do pedido e execução)
- Export/relatório automatizável: **Post-Beta/GA**

---

## 9. Qualidade, Ground Truth e Avaliação

### 9.1 Processo de Rotulagem (MVP)
- Ground truth via **painel interno de 3 revisores** (PM + Security + Ops/QA)
- Decisão por quórum: **2/3**
- Armazenar em tabela `labels`:
  - `check_id`, `final_label`, `votes`, `decision_reason`, `timestamp`

### 9.2 Amostragem e Métricas
- Semanal:
  - 100 checks aleatórios + 50 edge cases (150 total)
- Métricas:
  - FP, FN, Precision/Recall estimados pela amostragem rotulada
- Ações:
  - Ajustar sinais/thresholds em versão controlada (release notes internas)

### 9.3 “FN proxy” (MVP sem feedback do usuário)
- Proxy operacional baseado em:
  - reclassificações internas (amostragem semanal)
  - incidentes/relatos via canal de suporte (se houver)

---

## 10. Observabilidade e Eventos (Analytics)

### 10.1 Taxonomia mínima (MVP)
- `check_started`
- `check_completed`
- `verdict_shown`
- `share_verdict_clicked`
- `share_verdict_completed`
- `message_check_started`
- `message_check_completed`
- `qr_scan_started`
- `qr_scan_completed`
- `ocr_started`
- `ocr_completed`
- `paywall_shown`
- `checkout_started`
- `checkout_completed`
- `contact_cta_shown`
- `contact_submitted`

### 10.2 Campos padrão
- `timestamp`, `session_id`, `user_state (anon|premium)`, `check_type`, `ttfv_ms`, `cache_hit`, `verdict_class`, `risk_pct`, `provider_status`, `error_type`

---

## 11. Riscos e Mitigações

### 11.1 Riscos principais
- Falsos negativos (golpe classificado como LOW)
- Abuso (bots usando análise gratuita)
- Vazamento de PII (via logs, share card, armazenamento indevido)
- Custo de providers

### 11.2 Mitigações (MVP)
- Guardrail: UNCERTAIN por falta de confiança/timeout
- Rate limit e detecção simples anti-abuso
- Share card sem URL completa + máscara de PII
- Cache agressivo (48h) + fallback providers
- Kill switch

---

## 12. Escopo e Roadmap (alto nível)

### MVP (Base)
- URL Check (Free)
- Message Checklist (Free, com dupla granularidade)
- Shareable Verdict (Free)
- Paywall + Checkout web (Stripe/AbacatePay)
- Premium: QR + OCR/Vision
- LGPD: delete-on-request <24h
- Ground truth pipeline interno

### Beta / GA (futuro)
- Histórico visível ao usuário
- Alertas proativos
- Export LGPD automatizado
- Extensões/integrations

---

## 13. Glossário (curto)
- **TTFV:** Time to First Verdict
- **FP/FN:** Falso Positivo / Falso Negativo
- **UNCERTAIN:** resposta segura quando não há confiança suficiente
- **Feature Gating:** monetização por desbloqueio de funcionalidades

---
