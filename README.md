# 🧬 Gene Expression Atlas Explorer

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Recharts](https://img.shields.io/badge/Recharts-2.10-FF6384)

An interactive web application for visualizing single-cell RNA-seq gene expression patterns across immune cell types and cancer-related genes.

**🚀 Live Demo:** [[Gene Expression Atlas](https://gene-expression-atlas.vercel.app/)]

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

### 1. Main Interface - UMAP Visualization
![Main Interface](https://github.com/user-attachments/assets/46a1de2b-7c5d-42c6-8318-ad74d144580c)

**Overview of the main interface showing:**
- Clean, modern UI with gradient purple-pink theme
- Feature pills highlighting key capabilities (Real-time Analysis, Cell Specificity Scoring, Multi-Gene Comparison)
- Interactive search bar for instant gene lookup
- UMAP projection displaying 2,500 cells across 6 immune cell types, color-coded by cell type
- Empty state prompting users to search for genes to begin exploration

---

### 2. Gene Search - Auto-Suggest
![Gene Search](https://github.com/user-attachments/assets/21428c03-f105-4465-bf83-43f958b8c7ef)

**Intelligent search functionality:**
- Real-time auto-suggest as you type (searching "C" shows CD3D, CD3E, CD8A, etc.)
- 45+ genes organized alphabetically in suggestion pills
- Includes both immune markers (CD3D, CD4, CD8A) and cancer genes (MYC, BCL2, BRCA1, BRCA2)
- One-click access to any gene in the database
- Compare button for multi-gene analysis mode

---

### 3. Single Gene Analysis - BRCA1
![BRCA1 Analysis](https://github.com/user-attachments/assets/ea98d993-10b8-4bbf-8bf5-185782d6e1e9)

**Comprehensive gene expression analysis view:**
- **Gene Info Card**: Shows BRCA1 description, key pathways (Homologous recombination, DNA repair), and clinical relevance (hereditary breast/ovarian cancer, PARP inhibitor sensitivity)
- **Specificity Score**: 24% - indicates this is a housekeeping gene expressed across multiple cell types
- **UMAP with Expression Overlay**: Heat map coloring shows expression levels across all cells (low expression = gray, high = red)
- **Expression by Cell Type**: Bar chart displays average expression in each immune cell population
- **Expression Profile Grid**: Ranked expression values with progress bars, B cells showing highest expression (4.5), with lightning bolt indicating top expressing cell type

---

### 4. Multi-Gene Comparison - BRCA1 vs BRCA2
![Gene Comparison](https://github.com/user-attachments/assets/e7068304-3ba0-430f-9655-6fc62f3b6a85)

**Radar chart comparison mode:**
- Compare Mode banner shows selected genes (BRCA1, BRCA2 - 2/3 selected)
- **Gene Comparison Radar**: Six-axis radar chart displaying expression across all cell types simultaneously
- Purple polygon = BRCA1, Pink polygon = BRCA2
- Allows instant visual comparison of expression patterns
- Useful for marker panel design and identifying complementary genes
- Clear legend distinguishing each gene's expression profile

### Current Limitations
- ❌ Simulated data only (not connected to real single-cell databases)
- ❌ Limited to one dataset (PBMC 3k structure)
- ❌ No user data upload capability
- ❌ Static gene database (45 genes)
- ❌ No differential expression testing
- ❌ No clustering parameter adjustment

## 💡 Key Visual Features Demonstrated

1. **Progressive Disclosure**: Interface reveals complexity gradually - start simple, add detail as needed
2. **Data Visualization**: Multiple chart types (scatter plot, bar chart, radar chart) for different analytical needs
3. **Color Coding**: Consistent color scheme helps users quickly identify cell types and expression levels
4. **Interactive Elements**: Hover states, clickable pills, downloadable charts
5. **Biological Context**: Not just numbers - pathways and clinical relevance integrated throughout
6. **Professional Design**: Modern glassmorphism effects, smooth gradients, and polished UI suitable for presentations

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
- 🌐 Portfolio: [(https://www.arzukirici.com/)]
- 💼 LinkedIn: [linkedin.com/in/arzukirici]
- 📧 Email: [arzukirici@gmail.com]

## 🙏 Acknowledgments

- **Dataset Structure**: Inspired by 10X Genomics PBMC 3k dataset
- **Gene Annotations**: Curated from literature, GeneCards, and clinical databases
- **Design Philosophy**: Built to bridge the gap between computational biology and wet-lab research


**⭐ If you find this tool useful, please star the repository!**

**🐛 Found a bug or have a suggestion?** [Open an issue](https://github.com/agkirici/gene-expression-atlas/issues)
