function genFolderTree() {
  
  try {
    
  var foldername = 'WaaguDoc';
  var folderlisting = 'TreeView_' + foldername;
  
  var parentFolder = DriveApp.getFoldersByName(foldername).next();
 
  
  var ss = SpreadsheetApp.create(folderlisting);
  var sheet = ss.getActiveSheet();
  var frontCell = [];
  sheet.appendRow([foldername]).getCurrentCell().setFontWeight('bold').setFontColor('red');
  frontCell.push(" ");
  getChildNode(parentFolder,sheet,frontCell);
  var files = parentFolder.getFiles();
  while (files.hasNext()) {
    frontCell.push(files.next().getName());
    sheet.appendRow( frontCell);
    frontCell.pop();
    }
    
  } catch (e) {
    
    Logger.log(e.toString());
    
  }
  
}


function getChildNode(parent,sheet,frontCell) {
  
  var childFolders = parent.getFolders();
  while (childFolders.hasNext()) {
    
    var childFolder = childFolders.next();
    
    frontCell.push(childFolder.getName())
    sheet.appendRow(frontCell);
    sheet.getRange(sheet.getLastRow(), frontCell.length).setFontWeight('bold').setFontColor('red');
    frontCell.pop();
    var files = childFolder.getFiles();
    frontCell.push(" ");
    var start_row = 0;
    var row_no = 0;
    while (files.hasNext()) {
      frontCell.push(files.next().getName());
      sheet.appendRow(frontCell);
      if(row_no==0){
        start_row = sheet.getLastRow();
      }
      row_no=row_no+1;
      frontCell.pop();
    }
    if(row_no>0){
      var range;
      range = sheet.getRange(start_row, frontCell.length,row_no);
      // The row grouping depth is increased by row_no.
      range.shiftRowGroupDepth(1);
    }
    
    // Recursive call for any sub-folders
    getChildNode(childFolder,sheet,frontCell);
    frontCell.pop();
  }
  
}