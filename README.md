# Indian Oil Corporation - Administrative Approval Generator

## Overview
This web application generates administrative approval documents for Indian Oil Corporation Limited (IOCL) in the exact format of the original Word document. It allows users to input details about DU (Dispensing Unit) replacements and asset management, then generates a properly formatted Word document for official use.

## Features

### 🎯 Core Functionality
- **Dynamic Form Interface**: User-friendly form with guided input fields
- **DU Management**: Add/remove multiple DUs to be replaced (minimum 1 required)
- **Asset Management**: Add/remove multiple assets with detailed information
- **Validation**: Warning system when DU count and Asset count don't match
- **Word Document Generation**: Creates downloadable Word document in exact format

### 🎨 Design Features
- **Fluid Design**: Responsive layout that works on all devices
- **Light Color Schemes**: Multiple color-coded sections for easy navigation
- **Centered Layout**: All content centered for better readability
- **Interactive Elements**: Hover effects and smooth animations
- **Sample Text**: Sample data appears on hover to guide users

### 📋 Form Sections
1. **Basic Information**: Reference number, date, customer details, product type
2. **Existing Facilities**: Tank details, DU count
3. **DU Replacement**: Dynamic DU management with model, serial, and issue details
4. **Asset Replacement**: Dynamic asset management with financial details
5. **Proposal Details**: Replacement reasons and expected benefits

## How to Test

### Quick Test with Sample Data
1. Open `index.html` in your browser
2. The form will be pre-filled with sample data from the original Word document
3. Click "Generate Word Document" button
4. A Word document will download automatically
5. Open the downloaded file to verify formatting matches the original template

### Custom Test
1. Clear any fields you want to customize
2. Add your own data
3. Use "Add Another DU" and "Add Another Asset" buttons to add more items
4. Test the warning system by having different numbers of DUs and assets
5. Generate document with your custom data

### 1. Fill Basic Information
- Enter reference number, date, customer name and code
- Select divisional office, district, and product type
- Input monthly requirement in kiloliters

### 2. Add Existing Facilities
- Specify tank details (capacity and type)
- Enter number of existing DUs

### 3. Manage DU Replacements
- Add details for each DU to be replaced
- Include model number, serial number, and issue description
- Use "Add Another DU" button to add more DUs
- Minimum 1 DU required

### 4. Manage Assets
- Add asset details including serial number, capitalization date
- Enter asset name, acquisition value, and book value
- Use "Add Another Asset" button to add more assets
- Minimum 1 asset required

### 5. Complete Proposal Details
- Provide replacement justification
- Describe new equipment details
- List expected benefits

### 6. Generate Document
- Click "Generate Word Document" button
- Document will be automatically downloaded
- Filename format: `Administrative_Approval_[CustomerName]_[RefNumber].doc`

## Validation Features

### Count Mismatch Warning
- System displays warning if number of DUs and assets don't match
- Warning appears in top-left corner
- User can still submit and generate document despite warning

### Sample Data
- Sample text appears when hovering over input fields
- Helps users understand what information is expected
- If user leaves fields empty, sample data is used as default

## Technical Details

### Frontend Technologies
- **HTML5**: Semantic structure with accessibility features
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript ES6+**: Dynamic functionality and form handling
- **Font Awesome**: Professional icons
- **Google Fonts**: Inter font family for modern typography

### Key Functions
- `addDU()` / `removeDU()`: Dynamic DU management
- `addAsset()` / `removeAsset()`: Dynamic asset management
- `checkCountMismatch()`: Validation for DU/asset count matching
- `generateWordDocument()`: Creates downloadable Word document
- `collectFormData()`: Gathers all form data
- `generateHTMLContent()`: Creates Word-formatted HTML

### File Structure
```
index.html          # Main application interface
styles.css         # Styling and responsive design
script.js          # Dynamic functionality and document generation
README.md          # Documentation
```

## Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Sample Data
The application includes comprehensive sample data based on the original Word document:
- Customer: CSTC PAIKPARA (Code: 507311)
- Location: Kolkata, West Bengal
- Product: HSD (High Speed Diesel)
- Monthly Requirement: 48 KL
- Tank Details: 2 X 20 KL HSD UG TANKS

## Notes
- All fields are optional - sample data will be used if left empty
- Document generation uses HTML-to-Word conversion for maximum compatibility
- Generated documents maintain the exact formatting of the original template
- Application is designed for Indian Oil Corporation internal use

## Future Enhancements
- Save/load form data functionality
- Template management system
- Multi-language support
- Advanced validation rules
- Integration with IOCL databases
- PDF export option
- Digital signature support