import React, { useState, useMemo, useEffect } from 'react';
import { Search, Download, Info, Zap, TrendingUp, GitCompare, Sparkles } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

// Simulated PBMC 3k dataset
const generatePBMCData = () => {
  const cellTypes = ['CD4 T cells', 'CD8 T cells', 'NK cells', 'B cells', 'Monocytes', 'Dendritic cells'];
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#C7CEEA'];
  
  return Array.from({ length: 2500 }, (_, i) => {
    const cellType = cellTypes[Math.floor(Math.random() * cellTypes.length)];
    return {
      id: i,
      umap1: Math.random() * 20 - 10,
      umap2: Math.random() * 20 - 10,
      cellType,
      color: colors[cellTypes.indexOf(cellType)]
    };
  });
};

// Enhanced gene database with pathway and clinical info
const geneDatabase = {
  'CD3D': {
    name: 'CD3D',
    description: 'T cell receptor marker - critical for T cell activation',
    expressionPattern: {
      'CD4 T cells': 8.5,
      'CD8 T cells': 8.2,
      'NK cells': 0.5,
      'B cells': 0.2,
      'Monocytes': 0.1,
      'Dendritic cells': 0.3
    },
    pathways: ['T cell activation', 'Immune response', 'TCR signaling'],
    clinicalRelevance: 'Target for immunotherapy, SCID mutations',
    specificity: 0.95
  },
  'CD3E': {
    name: 'CD3E',
    description: 'T cell co-receptor - signal transduction component',
    expressionPattern: {
      'CD4 T cells': 8.3,
      'CD8 T cells': 8.1,
      'NK cells': 0.4,
      'B cells': 0.1,
      'Monocytes': 0.2,
      'Dendritic cells': 0.3
    },
    pathways: ['TCR signaling', 'T cell development', 'Signal transduction'],
    clinicalRelevance: 'Immunodeficiency syndromes, CAR-T therapy',
    specificity: 0.96
  },
  'CD8A': {
    name: 'CD8A',
    description: 'CD8 T cell marker - defines cytotoxic T lymphocytes',
    expressionPattern: {
      'CD4 T cells': 0.3,
      'CD8 T cells': 7.8,
      'NK cells': 2.1,
      'B cells': 0.1,
      'Monocytes': 0.2,
      'Dendritic cells': 0.2
    },
    pathways: ['Cytotoxic response', 'Antigen recognition', 'MHC I binding'],
    clinicalRelevance: 'Cancer immunotherapy target, viral immunity',
    specificity: 0.89
  },
  'CD8B': {
    name: 'CD8B',
    description: 'CD8 beta chain - enhances T cell receptor affinity',
    expressionPattern: {
      'CD4 T cells': 0.2,
      'CD8 T cells': 7.2,
      'NK cells': 0.3,
      'B cells': 0.1,
      'Monocytes': 0.1,
      'Dendritic cells': 0.1
    },
    pathways: ['CTL activation', 'MHC class I recognition', 'Adaptive immunity'],
    clinicalRelevance: 'Tumor infiltrating lymphocyte marker',
    specificity: 0.93
  },
  'CD4': {
    name: 'CD4',
    description: 'CD4 T cell marker - helper T cell identifier',
    expressionPattern: {
      'CD4 T cells': 6.5,
      'CD8 T cells': 0.4,
      'NK cells': 0.2,
      'B cells': 0.3,
      'Monocytes': 2.8,
      'Dendritic cells': 1.2
    },
    pathways: ['Helper T cell function', 'HIV entry receptor', 'Th1/Th2 differentiation'],
    clinicalRelevance: 'HIV infection, autoimmune disorders',
    specificity: 0.72
  },
  'IL7R': {
    name: 'IL7R (CD127)',
    description: 'IL-7 receptor - T cell homeostasis and memory',
    expressionPattern: {
      'CD4 T cells': 7.8,
      'CD8 T cells': 6.5,
      'NK cells': 0.8,
      'B cells': 1.2,
      'Monocytes': 0.3,
      'Dendritic cells': 0.4
    },
    pathways: ['T cell survival', 'Memory T cell maintenance', 'JAK-STAT signaling'],
    clinicalRelevance: 'SCID mutations, T cell lymphoblastic leukemia',
    specificity: 0.85
  },
  'MS4A1': {
    name: 'MS4A1 (CD20)',
    description: 'B cell marker - calcium channel regulator',
    expressionPattern: {
      'CD4 T cells': 0.1,
      'CD8 T cells': 0.2,
      'NK cells': 0.1,
      'B cells': 9.2,
      'Monocytes': 0.1,
      'Dendritic cells': 0.2
    },
    pathways: ['B cell activation', 'Calcium signaling', 'Antibody production'],
    clinicalRelevance: 'Rituximab target, B cell lymphomas',
    specificity: 0.98
  },
  'CD79A': {
    name: 'CD79A',
    description: 'B cell receptor component - signal transduction',
    expressionPattern: {
      'CD4 T cells': 0.1,
      'CD8 T cells': 0.1,
      'NK cells': 0.1,
      'B cells': 8.9,
      'Monocytes': 0.2,
      'Dendritic cells': 0.3
    },
    pathways: ['BCR signaling', 'B cell development', 'Antibody production'],
    clinicalRelevance: 'B cell malignancies, agammaglobulinemia',
    specificity: 0.97
  },
  'CD19': {
    name: 'CD19',
    description: 'B cell co-receptor - lowers BCR activation threshold',
    expressionPattern: {
      'CD4 T cells': 0.1,
      'CD8 T cells': 0.1,
      'NK cells': 0.1,
      'B cells': 8.7,
      'Monocytes': 0.1,
      'Dendritic cells': 0.2
    },
    pathways: ['B cell activation', 'Co-stimulation', 'PI3K signaling'],
    clinicalRelevance: 'CAR-T target, B cell deficiency',
    specificity: 0.97
  },
  'CD14': {
    name: 'CD14',
    description: 'Monocyte marker - LPS co-receptor',
    expressionPattern: {
      'CD4 T cells': 0.2,
      'CD8 T cells': 0.1,
      'NK cells': 0.3,
      'B cells': 0.2,
      'Monocytes': 9.5,
      'Dendritic cells': 3.2
    },
    pathways: ['Innate immunity', 'TLR4 signaling', 'Inflammation'],
    clinicalRelevance: 'Sepsis biomarker, innate immune defects',
    specificity: 0.91
  },
  'CD68': {
    name: 'CD68',
    description: 'Macrophage marker - lysosomal protein',
    expressionPattern: {
      'CD4 T cells': 0.1,
      'CD8 T cells': 0.1,
      'NK cells': 0.2,
      'B cells': 0.1,
      'Monocytes': 8.8,
      'Dendritic cells': 4.5
    },
    pathways: ['Phagocytosis', 'Antigen processing', 'Inflammation'],
    clinicalRelevance: 'Tumor-associated macrophages, atherosclerosis',
    specificity: 0.88
  },
  'S100A8': {
    name: 'S100A8',
    description: 'Myeloid marker - calcium-binding inflammatory protein',
    expressionPattern: {
      'CD4 T cells': 0.3,
      'CD8 T cells': 0.2,
      'NK cells': 0.4,
      'B cells': 0.2,
      'Monocytes': 9.3,
      'Dendritic cells': 2.1
    },
    pathways: ['Inflammation', 'Innate immunity', 'Neutrophil recruitment'],
    clinicalRelevance: 'IBD biomarker, cancer progression',
    specificity: 0.92
  },
  'FCGR3A': {
    name: 'FCGR3A (CD16)',
    description: 'NK cell and monocyte marker - antibody-dependent cytotoxicity',
    expressionPattern: {
      'CD4 T cells': 0.1,
      'CD8 T cells': 0.2,
      'NK cells': 8.9,
      'B cells': 0.1,
      'Monocytes': 5.2,
      'Dendritic cells': 1.8
    },
    pathways: ['ADCC', 'NK cell activation', 'Fc receptor signaling'],
    clinicalRelevance: 'Therapeutic antibody response predictor',
    specificity: 0.83
  },
  'NCAM1': {
    name: 'NCAM1 (CD56)',
    description: 'NK cell marker - neural cell adhesion molecule',
    expressionPattern: {
      'CD4 T cells': 0.2,
      'CD8 T cells': 0.8,
      'NK cells': 9.1,
      'B cells': 0.1,
      'Monocytes': 0.3,
      'Dendritic cells': 0.2
    },
    pathways: ['NK cell cytotoxicity', 'Cell adhesion', 'Target recognition'],
    clinicalRelevance: 'NK cell lymphomas, neuroblastoma',
    specificity: 0.95
  },
  'NKG7': {
    name: 'NKG7',
    description: 'NK and cytotoxic T cell marker - granule protein',
    expressionPattern: {
      'CD4 T cells': 1.2,
      'CD8 T cells': 7.5,
      'NK cells': 9.8,
      'B cells': 0.1,
      'Monocytes': 0.3,
      'Dendritic cells': 0.4
    },
    pathways: ['Cytotoxicity', 'Granule exocytosis', 'Target cell killing'],
    clinicalRelevance: 'Cytotoxic function marker, tumor immunity',
    specificity: 0.94
  },
  'GNLY': {
    name: 'GNLY (Granulysin)',
    description: 'Cytotoxic granule protein - antimicrobial',
    expressionPattern: {
      'CD4 T cells': 0.8,
      'CD8 T cells': 7.8,
      'NK cells': 9.5,
      'B cells': 0.1,
      'Monocytes': 0.2,
      'Dendritic cells': 0.3
    },
    pathways: ['Cell-mediated cytotoxicity', 'Antimicrobial defense', 'Apoptosis'],
    clinicalRelevance: 'Infection response, cancer immunosurveillance',
    specificity: 0.93
  },
  'FCER1A': {
    name: 'FCER1A',
    description: 'Dendritic cell marker - high-affinity IgE receptor',
    expressionPattern: {
      'CD4 T cells': 0.1,
      'CD8 T cells': 0.1,
      'NK cells': 0.2,
      'B cells': 0.2,
      'Monocytes': 1.2,
      'Dendritic cells': 8.7
    },
    pathways: ['Antigen presentation', 'Allergic response', 'DC maturation'],
    clinicalRelevance: 'Allergy, DC-based immunotherapy',
    specificity: 0.87
  },
  'CLEC9A': {
    name: 'CLEC9A',
    description: 'Dendritic cell marker - cross-presentation specialist',
    expressionPattern: {
      'CD4 T cells': 0.1,
      'CD8 T cells': 0.1,
      'NK cells': 0.1,
      'B cells': 0.1,
      'Monocytes': 0.8,
      'Dendritic cells': 8.2
    },
    pathways: ['Cross-presentation', 'CD8 T cell priming', 'Dead cell uptake'],
    clinicalRelevance: 'Cancer vaccine development, antiviral immunity',
    specificity: 0.94
  },
  'IL2RA': {
    name: 'IL2RA (CD25)',
    description: 'T cell activation marker - IL-2 receptor alpha chain',
    expressionPattern: {
      'CD4 T cells': 5.8,
      'CD8 T cells': 3.2,
      'NK cells': 1.5,
      'B cells': 0.8,
      'Monocytes': 0.5,
      'Dendritic cells': 0.9
    },
    pathways: ['T cell activation', 'Regulatory T cell function', 'IL-2 signaling'],
    clinicalRelevance: 'Treg marker, immunotherapy target (Daclizumab)',
    specificity: 0.76
  },
  'FOXP3': {
    name: 'FOXP3',
    description: 'Regulatory T cell master transcription factor',
    expressionPattern: {
      'CD4 T cells': 4.2,
      'CD8 T cells': 0.3,
      'NK cells': 0.1,
      'B cells': 0.1,
      'Monocytes': 0.1,
      'Dendritic cells': 0.2
    },
    pathways: ['Immune suppression', 'Treg development', 'Self-tolerance'],
    clinicalRelevance: 'IPEX syndrome, autoimmunity, cancer immunity',
    specificity: 0.91
  },
  'IFNG': {
    name: 'IFNG (IFN-γ)',
    description: 'Inflammatory cytokine - Th1 response mediator',
    expressionPattern: {
      'CD4 T cells': 6.5,
      'CD8 T cells': 7.2,
      'NK cells': 8.1,
      'B cells': 0.2,
      'Monocytes': 1.5,
      'Dendritic cells': 1.8
    },
    pathways: ['Th1 response', 'Macrophage activation', 'Antiviral immunity'],
    clinicalRelevance: 'Autoimmunity, infection susceptibility, IFN-γ deficiency',
    specificity: 0.81
  },
  'GZMB': {
    name: 'GZMB (Granzyme B)',
    description: 'Serine protease - induces target cell apoptosis',
    expressionPattern: {
      'CD4 T cells': 1.5,
      'CD8 T cells': 8.2,
      'NK cells': 9.3,
      'B cells': 0.1,
      'Monocytes': 0.2,
      'Dendritic cells': 0.3
    },
    pathways: ['Apoptosis induction', 'Cytotoxic killing', 'Caspase activation'],
    clinicalRelevance: 'Cytotoxic function biomarker, graft rejection',
    specificity: 0.91
  },
  'PRF1': {
    name: 'PRF1 (Perforin)',
    description: 'Pore-forming protein - enables granzyme delivery',
    expressionPattern: {
      'CD4 T cells': 1.1,
      'CD8 T cells': 7.9,
      'NK cells': 9.6,
      'B cells': 0.1,
      'Monocytes': 0.2,
      'Dendritic cells': 0.2
    },
    pathways: ['Membrane pore formation', 'Cytotoxic killing', 'Hemophagocytic syndromes'],
    clinicalRelevance: 'FHL mutations, hemophagocytic lymphohistiocytosis',
    specificity: 0.93
  },
  'TP53': {
    name: 'TP53 (p53)',
    description: 'Tumor suppressor - guardian of the genome',
    expressionPattern: {
      'CD4 T cells': 3.2,
      'CD8 T cells': 3.5,
      'NK cells': 2.8,
      'B cells': 3.1,
      'Monocytes': 3.8,
      'Dendritic cells': 3.4
    },
    pathways: ['Cell cycle arrest', 'Apoptosis', 'DNA repair', 'Senescence'],
    clinicalRelevance: 'Most mutated gene in cancer (>50%), Li-Fraumeni syndrome',
    specificity: 0.15
  },
  'MYC': {
    name: 'MYC (c-Myc)',
    description: 'Oncogene - master transcription factor for proliferation',
    expressionPattern: {
      'CD4 T cells': 4.8,
      'CD8 T cells': 5.2,
      'NK cells': 4.1,
      'B cells': 5.5,
      'Monocytes': 3.2,
      'Dendritic cells': 3.8
    },
    pathways: ['Cell proliferation', 'Metabolism', 'Ribosome biogenesis', 'Apoptosis'],
    clinicalRelevance: 'Burkitt lymphoma, many solid tumors, undruggable target',
    specificity: 0.28
  },
  'BCL2': {
    name: 'BCL2',
    description: 'Anti-apoptotic protein - prevents cell death',
    expressionPattern: {
      'CD4 T cells': 5.2,
      'CD8 T cells': 4.8,
      'NK cells': 3.5,
      'B cells': 7.8,
      'Monocytes': 2.1,
      'Dendritic cells': 2.5
    },
    pathways: ['Apoptosis inhibition', 'Mitochondrial membrane stabilization'],
    clinicalRelevance: 'Follicular lymphoma, CLL, Venetoclax target',
    specificity: 0.68
  },
  'KRAS': {
    name: 'KRAS',
    description: 'Oncogenic GTPase - RAS signaling mediator',
    expressionPattern: {
      'CD4 T cells': 2.8,
      'CD8 T cells': 2.5,
      'NK cells': 2.2,
      'B cells': 2.9,
      'Monocytes': 4.2,
      'Dendritic cells': 3.5
    },
    pathways: ['MAPK pathway', 'PI3K-AKT', 'Cell proliferation', 'Survival'],
    clinicalRelevance: 'Pancreatic cancer (90%), lung adenocarcinoma, colorectal cancer',
    specificity: 0.24
  },
  'EGFR': {
    name: 'EGFR',
    description: 'Receptor tyrosine kinase - growth factor receptor',
    expressionPattern: {
      'CD4 T cells': 1.5,
      'CD8 T cells': 1.2,
      'NK cells': 0.8,
      'B cells': 1.8,
      'Monocytes': 5.2,
      'Dendritic cells': 4.8
    },
    pathways: ['MAPK/ERK pathway', 'PI3K/AKT', 'Cell growth', 'Migration'],
    clinicalRelevance: 'NSCLC (erlotinib, osimertinib), glioblastoma, colorectal',
    specificity: 0.52
  },
  'BRCA1': {
    name: 'BRCA1',
    description: 'Tumor suppressor - DNA repair and genomic stability',
    expressionPattern: {
      'CD4 T cells': 3.8,
      'CD8 T cells': 4.2,
      'NK cells': 3.2,
      'B cells': 4.5,
      'Monocytes': 2.8,
      'Dendritic cells': 3.1
    },
    pathways: ['Homologous recombination', 'DNA repair', 'Cell cycle checkpoint'],
    clinicalRelevance: 'Hereditary breast/ovarian cancer, PARP inhibitor sensitivity',
    specificity: 0.22
  },
  'BRCA2': {
    name: 'BRCA2',
    description: 'Tumor suppressor - RAD51 recruitment for DNA repair',
    expressionPattern: {
      'CD4 T cells': 3.5,
      'CD8 T cells': 3.9,
      'NK cells': 2.9,
      'B cells': 4.1,
      'Monocytes': 2.5,
      'Dendritic cells': 2.8
    },
    pathways: ['Homologous recombination', 'DNA double-strand break repair'],
    clinicalRelevance: 'Hereditary breast/ovarian/prostate cancer, platinum sensitivity',
    specificity: 0.24
  },
  'PTEN': {
    name: 'PTEN',
    description: 'Tumor suppressor - PI3K pathway antagonist',
    expressionPattern: {
      'CD4 T cells': 4.5,
      'CD8 T cells': 4.8,
      'NK cells': 3.8,
      'B cells': 4.2,
      'Monocytes': 3.2,
      'Dendritic cells': 3.5
    },
    pathways: ['PI3K/AKT inhibition', 'Cell survival', 'Metabolism', 'Migration'],
    clinicalRelevance: 'Glioblastoma, prostate cancer, Cowden syndrome',
    specificity: 0.18
  },
  'RB1': {
    name: 'RB1 (Retinoblastoma)',
    description: 'Tumor suppressor - cell cycle gatekeeper',
    expressionPattern: {
      'CD4 T cells': 5.2,
      'CD8 T cells': 5.5,
      'NK cells': 4.5,
      'B cells': 5.8,
      'Monocytes': 4.1,
      'Dendritic cells': 4.3
    },
    pathways: ['G1/S checkpoint', 'E2F regulation', 'Cell cycle control'],
    clinicalRelevance: 'Retinoblastoma, small cell lung cancer, osteosarcoma',
    specificity: 0.16
  },
  'APC': {
    name: 'APC',
    description: 'Tumor suppressor - Wnt pathway regulator',
    expressionPattern: {
      'CD4 T cells': 3.8,
      'CD8 T cells': 3.5,
      'NK cells': 2.8,
      'B cells': 3.2,
      'Monocytes': 2.5,
      'Dendritic cells': 2.9
    },
    pathways: ['Wnt/β-catenin pathway', 'Cell adhesion', 'Chromosome segregation'],
    clinicalRelevance: 'Colorectal cancer (80% mutated), familial adenomatous polyposis',
    specificity: 0.19
  },
  'BRAF': {
    name: 'BRAF',
    description: 'Serine/threonine kinase - MAPK pathway component',
    expressionPattern: {
      'CD4 T cells': 3.2,
      'CD8 T cells': 3.5,
      'NK cells': 2.8,
      'B cells': 2.9,
      'Monocytes': 4.8,
      'Dendritic cells': 4.2
    },
    pathways: ['MAPK/ERK signaling', 'Cell proliferation', 'Differentiation'],
    clinicalRelevance: 'Melanoma (V600E), thyroid cancer, dabrafenib/vemurafenib target',
    specificity: 0.31
  },
  'ALK': {
    name: 'ALK',
    description: 'Receptor tyrosine kinase - fusion oncogene',
    expressionPattern: {
      'CD4 T cells': 0.8,
      'CD8 T cells': 0.9,
      'NK cells': 1.2,
      'B cells': 1.5,
      'Monocytes': 1.8,
      'Dendritic cells': 1.4
    },
    pathways: ['PI3K/AKT', 'JAK/STAT', 'RAS/MAPK', 'Neural development'],
    clinicalRelevance: 'NSCLC (EML4-ALK), ALCL, neuroblastoma, crizotinib target',
    specificity: 0.26
  },
  'HER2': {
    name: 'HER2 (ERBB2)',
    description: 'Receptor tyrosine kinase - growth factor receptor',
    expressionPattern: {
      'CD4 T cells': 1.2,
      'CD8 T cells': 1.1,
      'NK cells': 0.9,
      'B cells': 1.8,
      'Monocytes': 3.2,
      'Dendritic cells': 2.8
    },
    pathways: ['MAPK pathway', 'PI3K/AKT', 'Cell proliferation', 'Survival'],
    clinicalRelevance: 'Breast cancer (25%), gastric cancer, trastuzumab target',
    specificity: 0.42
  },
  'PDGFRA': {
    name: 'PDGFRA',
    description: 'Receptor tyrosine kinase - platelet-derived growth factor receptor',
    expressionPattern: {
      'CD4 T cells': 1.5,
      'CD8 T cells': 1.3,
      'NK cells': 1.8,
      'B cells': 1.2,
      'Monocytes': 4.5,
      'Dendritic cells': 3.8
    },
    pathways: ['PI3K/AKT', 'MAPK', 'Cell growth', 'Angiogenesis'],
    clinicalRelevance: 'GIST, glioblastoma, imatinib target',
    specificity: 0.45
  },
  'IDH1': {
    name: 'IDH1',
    description: 'Metabolic enzyme - when mutated produces oncometabolite',
    expressionPattern: {
      'CD4 T cells': 4.2,
      'CD8 T cells': 4.5,
      'NK cells': 3.8,
      'B cells': 4.1,
      'Monocytes': 5.2,
      'Dendritic cells': 4.8
    },
    pathways: ['TCA cycle', 'NADPH production', '2-HG oncometabolite (mutant)'],
    clinicalRelevance: 'Glioma, AML, chondrosarcoma, IDH inhibitors',
    specificity: 0.14
  },
  'PIK3CA': {
    name: 'PIK3CA',
    description: 'Lipid kinase - PI3K catalytic subunit',
    expressionPattern: {
      'CD4 T cells': 3.8,
      'CD8 T cells': 4.2,
      'NK cells': 3.2,
      'B cells': 4.5,
      'Monocytes': 4.8,
      'Dendritic cells': 4.1
    },
    pathways: ['PI3K/AKT/mTOR', 'Cell growth', 'Survival', 'Metabolism'],
    clinicalRelevance: 'Breast cancer, colorectal, endometrial, alpelisib target',
    specificity: 0.16
  },
  'NRAS': {
    name: 'NRAS',
    description: 'Oncogenic GTPase - neuroblastoma RAS',
    expressionPattern: {
      'CD4 T cells': 2.5,
      'CD8 T cells': 2.8,
      'NK cells': 3.2,
      'B cells': 2.2,
      'Monocytes': 3.8,
      'Dendritic cells': 3.1
    },
    pathways: ['MAPK pathway', 'PI3K/AKT', 'Cell proliferation'],
    clinicalRelevance: 'Melanoma (15-20%), AML, thyroid cancer',
    specificity: 0.24
  },
  'VHL': {
    name: 'VHL',
    description: 'Tumor suppressor - regulates hypoxia response',
    expressionPattern: {
      'CD4 T cells': 3.2,
      'CD8 T cells': 3.5,
      'NK cells': 2.8,
      'B cells': 3.1,
      'Monocytes': 2.9,
      'Dendritic cells': 3.3
    },
    pathways: ['HIF degradation', 'Oxygen sensing', 'Angiogenesis regulation'],
    clinicalRelevance: 'Clear cell renal cell carcinoma, von Hippel-Lindau syndrome',
    specificity: 0.12
  },
  'CDKN2A': {
    name: 'CDKN2A (p16)',
    description: 'Tumor suppressor - CDK inhibitor, cell cycle brake',
    expressionPattern: {
      'CD4 T cells': 2.8,
      'CD8 T cells': 3.2,
      'NK cells': 2.5,
      'B cells': 2.9,
      'Monocytes': 3.5,
      'Dendritic cells': 3.1
    },
    pathways: ['Cell cycle arrest', 'G1/S checkpoint', 'RB pathway', 'Senescence'],
    clinicalRelevance: 'Melanoma, pancreatic cancer, familial melanoma syndrome',
    specificity: 0.14
  },
  'MDM2': {
    name: 'MDM2',
    description: 'E3 ubiquitin ligase - p53 negative regulator',
    expressionPattern: {
      'CD4 T cells': 3.5,
      'CD8 T cells': 3.8,
      'NK cells': 2.9,
      'B cells': 3.2,
      'Monocytes': 4.2,
      'Dendritic cells': 3.7
    },
    pathways: ['p53 degradation', 'Cell cycle regulation', 'Apoptosis control'],
    clinicalRelevance: 'Sarcomas (amplified), MDM2 inhibitors in development',
    specificity: 0.18
  }
};

const GeneExpressionAtlas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGene, setSelectedGene] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedGenes, setComparedGenes] = useState([]);
  const [animateEntry, setAnimateEntry] = useState(false);

  const pbmcData = useMemo(() => generatePBMCData(), []);

  useEffect(() => {
    setAnimateEntry(true);
  }, [selectedGene]);

  const availableGenes = Object.keys(geneDatabase);

  const filteredGenes = availableGenes.filter(gene =>
    gene.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGeneSelect = (gene) => {
    if (compareMode && comparedGenes.length < 3) {
      setComparedGenes([...comparedGenes, geneDatabase[gene]]);
    } else {
      setSelectedGene(geneDatabase[gene]);
      setAnimateEntry(false);
    }
  };

  const clearComparison = () => {
    setComparedGenes([]);
    setCompareMode(false);
  };

  const umapDataWithExpression = useMemo(() => {
    if (!selectedGene) return pbmcData;

    return pbmcData.map(cell => ({
      ...cell,
      expression: selectedGene.expressionPattern[cell.cellType] + (Math.random() - 0.5) * 2
    }));
  }, [pbmcData, selectedGene]);

  const violinData = useMemo(() => {
    if (!selectedGene) return [];

    return Object.entries(selectedGene.expressionPattern).map(([cellType, avgExp]) => ({
      cellType,
      expression: avgExp,
      fill: pbmcData.find(c => c.cellType === cellType)?.color || '#999'
    }));
  }, [selectedGene, pbmcData]);

  // Radar chart data for comparison mode
  const radarData = useMemo(() => {
    if (comparedGenes.length === 0) return [];

    const cellTypes = ['CD4 T cells', 'CD8 T cells', 'NK cells', 'B cells', 'Monocytes', 'Dendritic cells'];
    return cellTypes.map(cellType => {
      const dataPoint = { cellType: cellType.replace(' cells', '') };
      comparedGenes.forEach((gene, idx) => {
        dataPoint[`gene${idx}`] = gene.expressionPattern[cellType];
      });
      return dataPoint;
    });
  }, [comparedGenes]);

  const getExpressionColor = (expression) => {
    if (!expression || expression < 1) return '#E8E8E8';
    if (expression < 3) return '#FEE5D9';
    if (expression < 5) return '#FCAE91';
    if (expression < 7) return '#FB6A4A';
    return '#CB181D';
  };

  // Calculate specificity score
  const getSpecificityScore = (pattern) => {
    const values = Object.values(pattern);
    const max = Math.max(...values);
    const others = values.filter(v => v !== max);
    const avgOthers = others.reduce((a, b) => a + b, 0) / others.length;
    return ((max - avgOthers) / max * 100).toFixed(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Glow Effect */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="text-purple-600" size={32} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Gene Expression Atlas
            </h1>
            <Sparkles className="text-pink-600" size={32} />
          </div>
          <p className="text-slate-600 text-lg">AI-Powered Single-Cell Expression Explorer • PBMC 3k Dataset</p>
          
          {/* Feature Pills */}
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            <span className="px-4 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-purple-700 border border-purple-200">
              <Zap size={14} className="inline mr-1" />
              Real-time Analysis
            </span>
            <span className="px-4 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-pink-700 border border-pink-200">
              <TrendingUp size={14} className="inline mr-1" />
              Cell Specificity Scoring
            </span>
            <span className="px-4 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-indigo-700 border border-indigo-200">
              <GitCompare size={14} className="inline mr-1" />
              Multi-Gene Comparison
            </span>
          </div>
        </div>

        {/* Search Bar with Enhanced UI */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-6 border border-white/20">
          <div className="flex gap-3 items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 text-purple-400" size={20} />
              <input
                type="text"
                placeholder="Search genes: CD3D, CD8A, MS4A1, NKG7..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 text-lg"
              />
            </div>
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                compareMode 
                  ? 'bg-purple-600 text-white shadow-lg scale-105' 
                  : 'bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50'
              }`}
            >
              <GitCompare size={20} className="inline mr-2" />
              {compareMode ? 'Comparing...' : 'Compare'}
            </button>
          </div>

          {/* Gene Suggestions */}
          {searchTerm && (
            <div className="flex flex-wrap gap-2">
              {filteredGenes.map(gene => (
                <button
                  key={gene}
                  onClick={() => {
                    handleGeneSelect(gene);
                    setSearchTerm(gene);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-800 rounded-lg transition-all hover:scale-105 font-medium"
                >
                  {gene}
                </button>
              ))}
            </div>
          )}

          {/* Comparison Mode Banner */}
          {compareMode && (
            <div className="mt-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-purple-900">Compare Mode Active</p>
                  <p className="text-sm text-purple-700">
                    Selected: {comparedGenes.map(g => g.name).join(', ') || 'None'} ({comparedGenes.length}/3)
                  </p>
                </div>
                {comparedGenes.length > 0 && (
                  <button
                    onClick={clearComparison}
                    className="px-4 py-2 bg-white text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Gene Info Banner with Clinical Relevance */}
        {selectedGene && !compareMode && (
          <div className={`bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 mb-6 shadow-lg transition-all duration-500 ${
            animateEntry ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <Info className="text-purple-600 mt-1 flex-shrink-0" size={24} />
                <div className="flex-1">
                  <h3 className="font-bold text-2xl text-purple-900 mb-1">{selectedGene.name}</h3>
                  <p className="text-purple-700 mb-3">{selectedGene.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-purple-900 mb-1">Key Pathways:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedGene.pathways.map(pathway => (
                          <span key={pathway} className="px-2 py-1 bg-white text-purple-700 text-xs rounded-full border border-purple-200">
                            {pathway}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-purple-900 mb-1">Clinical Relevance:</p>
                      <p className="text-sm text-purple-700">{selectedGene.clinicalRelevance}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Specificity Score Badge */}
              <div className="bg-white rounded-xl p-4 shadow-md text-center ml-4">
                <div className="text-3xl font-bold text-purple-600">
                  {getSpecificityScore(selectedGene.expressionPattern)}%
                </div>
                <div className="text-xs text-slate-600 mt-1">Specificity</div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison View */}
        {compareMode && comparedGenes.length > 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-6 border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Gene Comparison Radar</h2>
            <ResponsiveContainer width="100%" height={500}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#CBD5E1" />
                <PolarAngleAxis dataKey="cellType" tick={{ fill: '#64748B', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: '#64748B' }} />
                {comparedGenes.map((gene, idx) => (
                  <Radar
                    key={idx}
                    name={gene.name}
                    dataKey={`gene${idx}`}
                    stroke={['#8B5CF6', '#EC4899', '#3B82F6'][idx]}
                    fill={['#8B5CF6', '#EC4899', '#3B82F6'][idx]}
                    fillOpacity={0.3}
                  />
                ))}
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Main Visualization Grid */}
        {!compareMode && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* UMAP Plot */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">UMAP Projection</h2>
                <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                  <Download size={18} className="text-purple-600" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    type="number" 
                    dataKey="umap1" 
                    name="UMAP 1" 
                    domain={[-12, 12]}
                    tick={{ fill: '#64748B' }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="umap2" 
                    name="UMAP 2" 
                    domain={[-12, 12]}
                    tick={{ fill: '#64748B' }}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 rounded-xl shadow-xl border-2 border-purple-200">
                            <p className="font-bold text-slate-800">{data.cellType}</p>
                            {selectedGene && (
                              <p className="text-sm text-slate-600">
                                Expression: {data.expression?.toFixed(2) || 'N/A'}
                              </p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter data={umapDataWithExpression} shape="circle">
                    {umapDataWithExpression.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={selectedGene ? getExpressionColor(entry.expression) : entry.color}
                        opacity={0.7}
                        r={3}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              {selectedGene && (
                <div className="mt-4 flex items-center justify-center gap-2 text-xs">
                  <span className="text-slate-600 font-medium">Low</span>
                  <div className="flex gap-1">
                    <div className="w-10 h-5 bg-gray-200 rounded"></div>
                    <div className="w-10 h-5 rounded" style={{ backgroundColor: '#FEE5D9' }}></div>
                    <div className="w-10 h-5 rounded" style={{ backgroundColor: '#FCAE91' }}></div>
                    <div className="w-10 h-5 rounded" style={{ backgroundColor: '#FB6A4A' }}></div>
                    <div className="w-10 h-5 rounded" style={{ backgroundColor: '#CB181D' }}></div>
                  </div>
                  <span className="text-slate-600 font-medium">High</span>
                </div>
              )}
            </div>

            {/* Expression by Cell Type */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">
                  {selectedGene ? 'Expression by Cell Type' : 'Select a Gene'}
                </h2>
                <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                  <Download size={18} className="text-purple-600" />
                </button>
              </div>
              {selectedGene ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={violinData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="cellType" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100}
                      tick={{ fill: '#64748B', fontSize: 12 }}
                    />
                    <YAxis 
                      label={{ value: 'Expression Level', angle: -90, position: 'insideLeft', fill: '#64748B' }}
                      tick={{ fill: '#64748B' }}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 rounded-xl shadow-xl border-2 border-purple-200">
                              <p className="font-bold text-slate-800">{payload[0].payload.cellType}</p>
                              <p className="text-sm text-slate-600">
                                Avg Expression: {payload[0].value.toFixed(2)}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="expression" radius={[8, 8, 0, 0]}>
                      {violinData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <Search size={48} className="text-purple-400" />
                    </div>
                    <p className="text-slate-600 font-medium">Search for a gene to explore expression</p>
                    <p className="text-slate-400 text-sm mt-2">Try: CD3D, CD8A, MS4A1, NKG7</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Stats Grid */}
        {selectedGene && !compareMode && (
          <div className="mt-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Expression Profile</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(selectedGene.expressionPattern)
                .sort((a, b) => b[1] - a[1])
                .map(([cellType, expression], idx) => (
                  <div 
                    key={cellType} 
                    className="relative overflow-hidden text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-all hover:scale-105 cursor-pointer"
                  >
                    {idx === 0 && (
                      <div className="absolute top-1 right-1">
                        <Zap size={16} className="text-yellow-500" />
                      </div>
                    )}
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {expression.toFixed(1)}
                    </div>
                    <div className="text-xs text-slate-600 mt-1 font-medium">{cellType}</div>
                    <div className="mt-2 w-full h-1.5 bg-white rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${(expression / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-white/20">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-purple-700">Demo Dataset:</span> PBMC 3k • 
              <span className="font-semibold text-pink-700 ml-2">Built with:</span> React + Recharts + Tailwind
            </p>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Showcasing advanced single-cell visualization & AI-powered gene expression analysis
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneExpressionAtlas;