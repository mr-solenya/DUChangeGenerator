// Global variables for tracking DU and Asset counts
let duCount = 1;
let assetCount = 1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set default date to today
    document.getElementById('date').valueAsDate = new Date();
    
    // Add sample data for testing
    addSampleData();
    
    // Add event listeners for validation
    setupValidation();
    
    // Add Font Awesome for icons
    addFontAwesome();
});

function addSampleData() {
    // Add sample data to form fields for testing
    const sampleData = {
        refNumber: 'IOCL/KOL/2026/001',
        customerName: 'CSTC PAIKPARA',
        customerCode: '507311',
        divisionalOffice: 'Kolkata Divisional Office',
        district: 'Kolkata, West Bengal',
        monthlyRequirement: '48',
        productType: 'HSD',
        tankDetails: '2 X 20 KL HSD UG TANKS',
        duCount: '02',
        replacementReason: 'Old DU requires frequent maintenance causing great inconvenience to the customer',
        newEquipment: 'New ERA DU with advanced features and better reliability',
        benefits: 'Improved reliability, reduced maintenance costs, better customer satisfaction'
    };
    
    // Fill in the sample data
    Object.keys(sampleData).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = sampleData[key];
        }
    });
}

function addFontAwesome() {
    // Font Awesome is already included in the HTML, so we can skip this
    console.log('Font Awesome loaded');
}

function setupValidation() {
    // Add event listeners for DU and Asset containers to check counts
    const observer = new MutationObserver(checkCountMismatch);
    observer.observe(document.getElementById('duContainer'), { childList: true });
    observer.observe(document.getElementById('assetContainer'), { childList: true });
}

function checkCountMismatch() {
    const duItems = document.querySelectorAll('.du-item').length;
    const assetItems = document.querySelectorAll('.asset-item').length;
    const warningDiv = document.getElementById('warning-message');
    const warningText = document.getElementById('warning-text');
    
    if (duItems !== assetItems) {
        warningDiv.style.display = 'flex';
        warningText.textContent = `Warning: Number of DU replacements (${duItems}) and assets (${assetItems}) don't match!`;
    } else {
        warningDiv.style.display = 'none';
    }
}

// DU Management Functions
function addDU() {
    duCount++;
    const container = document.getElementById('duContainer');
    
    const duItem = document.createElement('div');
    duItem.className = 'du-item';
    duItem.innerHTML = `
        <h4>DU #${duCount}</h4>
        <div class="form-grid">
            <div class="form-group">
                <label>DU Model:</label>
                <input type="text" name="duModel[]" placeholder="Enter DU model" 
                       title="Enter the DU model number" value="MIDCO Model No: ${170 + duCount}">
                <small class="sample-text">Sample: MIDCO Model No: 172</small>
            </div>
            <div class="form-group">
                <label>Serial Number:</label>
                <input type="text" name="duSerial[]" placeholder="Enter serial number" 
                       title="Enter the DU serial number" value="0H${1320 + duCount}">
                <small class="sample-text">Sample: 0H1323</small>
            </div>
            <div class="form-group">
                <label>Issue Description:</label>
                <textarea name="duIssue[]" rows="2" placeholder="Describe the issue with this DU" 
                          title="Describe why this DU needs replacement">Old and frequently goes out of order, requires frequent maintenance</textarea>
                <small class="sample-text">Sample: Old and frequently goes out of order, requires frequent maintenance</small>
            </div>
        </div>
        <button type="button" class="btn-remove" onclick="removeDU(this)">Remove DU</button>
    `;
    
    container.appendChild(duItem);
    
    // Show remove buttons for all DU items when there are multiple
    updateRemoveButtons('du-item', 'btn-remove');
}

function removeDU(button) {
    const duItem = button.closest('.du-item');
    duItem.remove();
    
    // Reorder DU numbers
    reorderItems('du-item', 'DU');
    
    // Hide remove button if only one DU remains
    updateRemoveButtons('du-item', 'btn-remove');
    
    // Check for count mismatch
    checkCountMismatch();
}

// Asset Management Functions
function addAsset() {
    assetCount++;
    const container = document.getElementById('assetContainer');
    
    const assetItem = document.createElement('div');
    assetItem.className = 'asset-item';
    assetItem.innerHTML = `
        <h4>Asset #${assetCount}</h4>
        <div class="form-grid">
            <div class="form-group">
                <label>Asset Serial Number:</label>
                <input type="text" name="assetSerial[]" placeholder="Enter asset serial number" 
                       title="Enter the asset serial number" value="Asset-${assetCount.toString().padStart(3, '0')}">
                <small class="sample-text">Sample: Asset-001</small>
            </div>
            <div class="form-group">
                <label>Capitalization Date:</label>
                <input type="date" name="assetCapDate[]" title="Select the capitalization date" value="2020-03-15">
                <small class="sample-text">Sample: 15/03/2020</small>
            </div>
            <div class="form-group">
                <label>Asset Name:</label>
                <input type="text" name="assetName[]" placeholder="Enter asset name" 
                       title="Enter the asset name" value="HSD DU Equipment">
                <small class="sample-text">Sample: HSD DU Equipment</small>
            </div>
            <div class="form-group">
                <label>Acquisition Value (Rs.):</label>
                <input type="number" name="assetAcqValue[]" placeholder="Enter acquisition value" 
                       title="Enter the acquisition value in rupees" value="${250000 + (assetCount * 10000)}">
                <small class="sample-text">Sample: 250000</small>
            </div>
            <div class="form-group">
                <label>Book Value (Rs.):</label>
                <input type="number" name="assetBookValue[]" placeholder="Enter book value" 
                       title="Enter the current book value in rupees" value="${125000 + (assetCount * 5000)}">
                <small class="sample-text">Sample: 125000</small>
            </div>
        </div>
        <button type="button" class="btn-remove" onclick="removeAsset(this)">Remove Asset</button>
    `;
    
    container.appendChild(assetItem);
    
    // Show remove buttons for all asset items when there are multiple
    updateRemoveButtons('asset-item', 'btn-remove');
}

function removeAsset(button) {
    const assetItem = button.closest('.asset-item');
    assetItem.remove();
    
    // Reorder Asset numbers
    reorderItems('asset-item', 'Asset');
    
    // Hide remove button if only one asset remains
    updateRemoveButtons('asset-item', 'btn-remove');
    
    // Check for count mismatch
    checkCountMismatch();
}

// Helper Functions
function updateRemoveButtons(itemClass, buttonClass) {
    const items = document.querySelectorAll(`.${itemClass}`);
    const buttons = document.querySelectorAll(`.${itemClass} .${buttonClass}`);
    
    buttons.forEach(button => {
        button.style.display = items.length > 1 ? 'block' : 'none';
    });
}

function reorderItems(itemClass, prefix) {
    const items = document.querySelectorAll(`.${itemClass}`);
    items.forEach((item, index) => {
        const heading = item.querySelector('h4');
        if (heading) {
            heading.textContent = `${prefix} #${index + 1}`;
        }
    });
}

// Form Submission and Word Generation
document.getElementById('approvalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateWordDocument();
});

function generateWordDocument() {
    const formData = collectFormData();
    const htmlContent = generateHTMLContent(formData);
    
    // Create a blob with the HTML content - using application/msword for better compatibility
    const blob = new Blob(['\ufeff', htmlContent], { 
        type: 'application/msword;charset=utf-8' 
    });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Create filename with current date and customer info
    const date = new Date().toISOString().split('T')[0];
    const customerName = formData.customerName.replace(/\s+/g, '_');
    const refNumber = formData.refNumber.replace(/[/\\]/g, '_');
    
    a.download = `Administrative_Approval_${customerName}_${refNumber}_${date}.doc`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    // Show success message
    showSuccessMessage();
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Word document generated successfully!
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function collectFormData() {
    const formData = {};
    
    // Basic Information
    formData.refNumber = document.getElementById('refNumber').value || 'IOCL/KOL/2026/001';
    formData.date = document.getElementById('date').value || new Date().toISOString().split('T')[0];
    formData.customerName = document.getElementById('customerName').value || 'CSTC PAIKPARA';
    formData.customerCode = document.getElementById('customerCode').value || '507311';
    formData.divisionalOffice = document.getElementById('divisionalOffice').value || 'Kolkata Divisional Office';
    formData.district = document.getElementById('district').value || 'Kolkata, West Bengal';
    formData.monthlyRequirement = document.getElementById('monthlyRequirement').value || '48';
    formData.productType = document.getElementById('productType').value || 'HSD';
    
    // Tank Information
    formData.tankDetails = document.getElementById('tankDetails').value || '2 X 20 KL HSD UG TANKS';
    formData.duCount = document.getElementById('duCount').value || '02';
    
    // DU Details
    formData.duDetails = [];
    const duModels = document.getElementsByName('duModel[]');
    const duSerials = document.getElementsByName('duSerial[]');
    const duIssues = document.getElementsByName('duIssue[]');
    
    for (let i = 0; i < duModels.length; i++) {
        formData.duDetails.push({
            model: duModels[i].value || 'MIDCO Model No: 172',
            serial: duSerials[i].value || '0H1323',
            issue: duIssues[i].value || 'Old and frequently goes out of order, requires frequent maintenance'
        });
    }
    
    // Asset Details
    formData.assetDetails = [];
    const assetSerials = document.getElementsByName('assetSerial[]');
    const assetCapDates = document.getElementsByName('assetCapDate[]');
    const assetNames = document.getElementsByName('assetName[]');
    const assetAcqValues = document.getElementsByName('assetAcqValue[]');
    const assetBookValues = document.getElementsByName('assetBookValue[]');
    
    for (let i = 0; i < assetSerials.length; i++) {
        formData.assetDetails.push({
            serial: assetSerials[i].value || 'Asset-001',
            capDate: assetCapDates[i].value || '2020-03-15',
            name: assetNames[i].value || 'HSD DU Equipment',
            acqValue: assetAcqValues[i].value || '250000',
            bookValue: assetBookValues[i].value || '125000'
        });
    }
    
    // Proposal Details
    formData.replacementReason = document.getElementById('replacementReason').value || 'Old DU requires frequent maintenance causing great inconvenience to the customer';
    formData.newEquipment = document.getElementById('newEquipment').value || 'New ERA DU with advanced features and better reliability';
    formData.benefits = document.getElementById('benefits').value || 'Improved reliability, reduced maintenance costs, better customer satisfaction';
    
    return formData;
}

function generateHTMLContent(data) {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    };
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Administrative Approval - ${data.customerName}</title>
    <style>
        body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 40px; }
        .logo { width: 60px; margin-bottom: 20px; }
        .title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { font-size: 14px; color: #666; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #2c3e50; }
        .content { margin-bottom: 15px; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th, .table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .table th { background-color: #f8f9fa; font-weight: bold; }
        .highlight { background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .footer { margin-top: 40px; text-align: right; font-style: italic; }
        .annexure { margin-top: 30px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Indian_Oil_Corporation_Logo.svg/1200px-Indian_Oil_Corporation_Logo.svg.png" alt="Indian Oil Corporation" class="logo">
        <div class="title">Indian Oil Corporation Ltd. (MD)</div>
        <div class="subtitle">${data.divisionalOffice}</div>
    </div>
    
    <div style="text-align: right; margin-bottom: 30px;">
        <strong>Ref:</strong> ${data.refNumber}<br>
        <strong>Date:</strong> ${formatDate(data.date)}
    </div>
    
    <div class="section">
        <div class="section-title">Subject: Replacement of ${data.duDetails.length} No. ${data.productType} DU with new ${data.productType} DU at ${data.customerName} (CC: ${data.customerCode})</div>
    </div>
    
    <div class="section">
        <div class="section-title">BACKGROUND:</div>
        <div class="content">
            ${data.customerName} (CC: ${data.customerCode}), Dist- ${data.district} is a major ${data.productType} customer of ${data.divisionalOffice}. The customer has a monthly requirement of approx. ${data.monthlyRequirement} KL.
        </div>
        <div class="content">
            We have installed the following facilities at the customer's premises:
        </div>
        <table class="table">
            <tr>
                <th>Tanks</th>
                <td>${data.tankDetails}</td>
            </tr>
            <tr>
                <th>DUs</th>
                <td>${data.duCount} ${data.productType} DU</td>
            </tr>
        </table>
        <div class="content">
            ${data.duDetails.map((du, index) => `
                One of the existing DUs (${du.model} Serial No: ${du.serial}) is ${du.issue.toLowerCase()}
            `).join('. ')}
        </div>
    </div>
    
    <div class="section">
        <div class="section-title">PROPOSAL:</div>
        <div class="content">
            It has been proposed to replace the old DU with new ERA
        </div>
        <div class="highlight">
            <strong>Justification:</strong> ${data.replacementReason}
        </div>
        <div class="content">
            <strong>New Equipment:</strong> ${data.newEquipment}
        </div>
        <div class="content">
            <strong>Expected Benefits:</strong> ${data.benefits}
        </div>
    </div>
    
    <div class="section">
        <div class="section-title">ASSET DETAILS:</div>
        <table class="table">
            <thead>
                <tr>
                    <th>Sr. No.</th>
                    <th>Asset Serial No.</th>
                    <th>Cap. Date</th>
                    <th>Asset Name</th>
                    <th>Acq. Value (Rs.)</th>
                    <th>Book Value (Rs.)</th>
                </tr>
            </thead>
            <tbody>
                ${data.assetDetails.map((asset, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${asset.serial}</td>
                        <td>${formatDate(asset.capDate)}</td>
                        <td>${asset.name}</td>
                        <td style="text-align: right;">${Number(asset.acqValue).toLocaleString()}</td>
                        <td style="text-align: right;">${Number(asset.bookValue).toLocaleString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div class="annexure">
            <em>Asset ledger is attached as Annexure-2 in the note.</em>
        </div>
    </div>
    
    <div class="footer">
        Administrative Approval Generated<br>
        ${data.divisionalOffice}<br>
        ${formatDate(data.date)}
    </div>
</body>
</html>
    `;
}