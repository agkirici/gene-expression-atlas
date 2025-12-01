# 🧬 Gene Expression Atlas Explorer

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Recharts](https://img.shields.io/badge/Recharts-2.10-FF6384)

An interactive web application for visualizing single-cell RNA-seq gene expression patterns across immune cell types and cancer-related genes.

## 🎯 Project Goals

### The Problem
Researchers and bioinformaticians face several challenges when working with single-cell RNA-seq data:

- **Accessibility Gap**: Existing tools like Seurat and Scanpy require programming knowledge (R/Python), limiting access for wet-lab scientists and clinicians
- **Time-Consuming Analysis**: Checking gene expression across cell types typically requires running code, waiting for plots to generate, and iterating manually
- **Lack of Context**: Most visualization tools don't provide biological context (pathways, clinical relevance) alongside expression data
- **No Quick Lookup**: Researchers often just need to quickly check "Is gene X expressed in cell type Y?" without setting up an entire analysis pipeline
- **Limited Comparison Tools**: Comparing multiple genes side-by-side requires custom scripting

### The Solution
This tool provides:

✅ **Instant gene expression lookup** - No coding required, just search and click  
✅ **Biological context integration** - See pathways and clinical relevance alongside expression data  
✅ **Multi-gene comparison** - Radar charts for comparing up to 3 genes simultaneously  
✅ **Cell-type specificity scoring** - Quantitative measure of how specific a gene is to each cell type  
✅ **Publication-ready visualizations** - UMAP projections and bar charts ready for export  
✅ **Comprehensive gene database** - 45+ curated genes including immune markers and cancer genes  

## 🔬 Use Cases

### For Researchers
- **Marker Validation**: Quickly verify if your gene of interest is a good cell-type marker
- **Panel Design**: Compare multiple genes to select optimal markers for flow cytometry or spatial transcriptomics panels
- **Literature Review**: Check expression patterns when reading papers or planning experiments
- **Hypothesis Generation**: Explore unexpected expression patterns that might lead to new research questions

### For Biotech/Pharma
- **Target Expression Profiling**: Assess which immune cell types express potential drug targets
- **Biomarker Discovery**: Identify cell-type-specific genes for diagnostic development
- **CAR-T Design**: Evaluate target antigens across immune cell populations
- **Competitor Analysis**: Quickly look up genes mentioned in competitor publications

### For Education
- **Teaching Tool**: Demonstrate single-cell analysis concepts without requiring students to code
- **Interactive Learning**: Students can explore gene expression patterns hands-on
- **Data Literacy**: Bridge the gap between wet-lab biology and computational analysis

### For Clinical Applications
- **Diagnostic Marker Selection**: Evaluate candidate genes for clinical diagnostic panels
- **Therapy Target Assessment**: Check if therapeutic targets are expressed in patient-relevant cell types
- **Immunotherapy Planning**: Assess immune cell marker expression for treatment selection

## ✨ Key Features

### 1. Real-Time Gene Search
- Instant search across 45+ genes
- Auto-suggest as you type
- Covers major immune cell markers and cancer genes

### 2. Interactive UMAP Visualization
- 2,500 simulated cells based on PBMC 3k structure
- Expression overlay with intuitive color gradients
- Hover for cell-type and expression details

### 3. Cell-Type Specificity Scoring
- **Unique metric**: Quantifies how specific a gene is to its primary cell type
- Helps identify the best markers for each population
- Calculated as: `(max_expression - avg_other_cells) / max_expression × 100%`

### 4. Multi-Gene Comparison Mode
- Compare up to 3 genes simultaneously
- Radar chart visualization shows expression across all cell types
- Perfect for marker panel design and gene family analysis

### 5. Biological Context Integration
- **Key Pathways**: Shows which biological processes the gene is involved in
- **Clinical Relevance**: Highlights disease associations and therapeutic applications
- **Drug Targets**: Identifies FDA-approved drugs targeting the gene

### 6. Comprehensive Gene Coverage

**Immune Cell Markers (24 genes):**
- T cells: CD3D, CD3E, CD8A, CD8B, CD4, IL7R, IL2RA, FOXP3
- B cells: MS4A1 (CD20), CD79A, CD19
- NK cells: NCAM1 (CD56), NKG7, GNLY, FCGR3A (CD16)
- Myeloid: CD14, CD68, S100A8, FCER1A, CLEC9A
- Cytotoxic function: GZMB, PRF1, IFNG

**Cancer Genes (21 genes):**
- Tumor Suppressors: TP53, BRCA1, BRCA2, PTEN, RB1, APC, VHL, CDKN2A
- Oncogenes: MYC, KRAS, NRAS, BRAF, PIK3CA
- Receptor Tyrosine Kinases: EGFR, HER2, ALK, PDGFRA
- Others: BCL2, IDH1, MDM2

## 🛠️ Technical Stack

- **Frontend Framework**: React 18.2.0
- **Visualization**: Recharts 2.10.3
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide React
- **Data Structure**: Based on 10X Genomics PBMC 3k dataset architecture

## 📊 Dataset Information

**Simulated PBMC 3k Structure:**
- 2,500 cells across 6 major immune cell types
- Expression patterns based on known biology from literature
- Cell type proportions approximate real PBMC composition

**Why PBMC 3k?**
- Industry-standard reference dataset
- Well-characterized cell types
- Widely recognized by bioinformatics community
- Used in Seurat and Scanpy tutorials

## 🚀 Getting Started

### Installation
```bash
# Clone the repository
git clone https://github.com/agkirici/gene-expression-atlas.git
cd gene-expression-atlas

# Install dependencies
npm install

# Start development server
npm start
```

### Usage Examples

**1. Check if a gene is a good marker:**
- Search for "CD8A"
- Check specificity score (89% = excellent marker)
- View UMAP to see cell-type localization

**2. Design a marker panel:**
- Click "Compare" button
- Select: CD3D, CD19, CD14
- View radar chart to see non-overlapping expression

**3. Explore cancer gene expression:**
- Search for "TP53" or "KRAS"
- See expression across immune cells
- Check clinical relevance section

## 🎨 Screenshots

[Add screenshots here showing:]
- Main interface with gene search
- UMAP visualization with expression overlay
- Multi-gene comparison radar chart
- Gene information card with pathways

## 📈 Future Enhancements

### Current Limitations
- ❌ Simulated data only (not connected to real single-cell databases)
- ❌ Limited to one dataset (PBMC 3k structure)
- ❌ No user data upload capability
- ❌ Static gene database (45 genes)
- ❌ No differential expression testing
- ❌ No clustering parameter adjustment

### Planned Features
- [ ] **Real Data Integration**: Connect to public databases (CELLxGENE, Single Cell Portal)
- [ ] **Multi-Dataset Support**: Compare expression across tissues/conditions
- [ ] **User Data Upload**: Allow researchers to upload their own datasets
- [ ] **Expanded Gene Database**: Add 500+ commonly studied genes
- [ ] **Gene Set Enrichment**: Analyze lists of differentially expressed genes
- [ ] **Export Functionality**: Download publication-ready figures (SVG, PNG, PDF)
- [ ] **Pathway Visualization**: Interactive pathway diagrams
- [ ] **Statistical Testing**: Built-in differential expression analysis
- [ ] **Authentication**: Save favorite genes and comparisons
- [ ] **API Integration**: Connect to GeneCards, NCBI Gene, Ensembl

## 🤝 Contributing

Contributions are welcome! Areas where help is needed:

- **Curating more genes**: Adding expression patterns for additional genes
- **Real data integration**: Connecting to public single-cell databases
- **New visualizations**: Violin plots, dot plots, heatmaps
- **Documentation**: Usage tutorials and examples
- **Testing**: Unit tests and integration tests

## 📄 License

MIT License - free to use for any purpose, commercial or academic.

## 👤 Author

**Arzu Kirici**
- 🧬 Scientist building user-friendly software for genomics research
- 💼 Background: Genetic diagnostics, cancer research, multi-omics analysis
- 🌐 Portfolio: [arzukirici.com]
- 💼 LinkedIn: [linkedin.com/in/arzukirici]
- 📧 Email: [arzukirici@gmail.com]

## 🙏 Acknowledgments

- **Dataset Structure**: Inspired by 10X Genomics PBMC 3k dataset
- **Gene Annotations**: Curated from literature, GeneCards, and clinical databases
- **Design Philosophy**: Built to bridge the gap between computational biology and wet-lab research


**⭐ If you find this tool useful, please star the repository!**

**🐛 Found a bug or have a suggestion?** [Open an issue](https://github.com/agkirici/gene-expression-atlas/issues)

**🚀 Live Demo:** [[Add your deployed URL here](https://gene-expression-atlas.vercel.app/)]
