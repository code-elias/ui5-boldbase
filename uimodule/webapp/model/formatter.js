sap.ui.define(["sap/ui/core/format/DateFormat","sap/ui/core/format/NumberFormat"], 
function (DateFormat, NumberFormat) {
    "use strict";

    var floatBx2FloatPrice = function(bxInput){
        //Converte il valore ritornato da BxPro (x 100) in decimale
        return isNaN(bxInput) ? 0 : bxInput/100;
    }

    var floatBx2FloatQty = function(bxInput){
        //Converte il valore ritornato da BxPro (x 1000) in decimale
        return isNaN(bxInput) ? 0 : bxInput/1000;
    }

    return {
        dateTS2Date: function(date){
            //convert yyyy-MM-dd\'T\'HH:mm:ss to dd/MM/yyyy (empty for null)
            if(!date) return "";
            
            var oUTCtoDate = DateFormat.getDateTimeInstance({
                pattern: 'yyyy-MM-dd\'T\'HH:mm:ss',
                strictParsing: true
            });

            var oDateToString = DateFormat.getDateTimeInstance({
                pattern: 'dd/MM/yyyy'
            });

            return oDateToString.format(oUTCtoDate.parse(date));
        },
        dateTS2TS: function(date){
            //convert yyyy-MM-dd\'T\'HH:mm:ss to dd/MM/yyyy HH:mm:ss (empty for null)
            if(!date) return "";
            
            var oUTCtoDate = DateFormat.getDateTimeInstance({
                pattern: 'yyyy-MM-dd\'T\'HH:mm:ss',
                strictParsing: true
            });

            var oDateToString = DateFormat.getDateTimeInstance({
                pattern: 'dd/MM/yyyy HH:mm:ss'
            });

            return oDateToString.format(oUTCtoDate.parse(date));
        },
        floatQtyFormat: function(input, bxFormat=false){
            input = input ?? 0;
            //Formatta la quantità, se bxFormat=true si aspetta valore*1000
            var oFormatOptions = {
                minFractionDigits: 2,
                maxFractionDigits: 2,
                decimalSeparator: bxFormat ? ',' : '.',
                groupingEnabled: false
            },
            oFloatFormat = NumberFormat.getFloatInstance(oFormatOptions);

            return oFloatFormat.format(bxFormat ? floatBx2FloatQty(input) : input);
        },
        floatPriceFormat: function(input, bxFormat=false){
            input = input ?? 0;
            //Formatta la quantità
            var oFormatOptions = {
                minFractionDigits: 3,
                maxFractionDigits: 3,
                decimalSeparator: bxFormat ? ',' : '.',
                groupingEnabled: false
            },
            oFloatFormat = NumberFormat.getFloatInstance(oFormatOptions);
            
            return oFloatFormat.format(bxFormat ? floatBx2FloatPrice(input) : input);
        },
        prjGetNumber(prjNum, sprjNum){
            //ritorna il numero del projct/sproject
            var retPrj = prjNum;
            if (sprjNum) retPrj += `-${sprjNum}`

            return retPrj;
        },
        yN2Bool: function(value){
            //convert Y/N to boolean
            return value==="Y";
        },
        bool2YN: function(value){
            //convert boolean to Y/N
            return value ? "Y" : "N";
        },
        matTypeIcon: function(particleObj){
            //icone indicate da EF (mail del 20/12)
            if(particleObj){
                if( particleObj.PlaningSys=="M") return "sap-icon://SAP-icons-TNT/requirement-diagram" //MRP
                else if(particleObj.PrcrmntMtd=="M" && particleObj.TreeType!="N") return "sap-icon://SAP-icons-TNT/bill-of-material" //Produzione+distinta
                else if(particleObj.parent_key) return "sap-icon://add-product" //Componente distinta
                else if(particleObj.PrcrmntMtd=="B") return "sap-icon://product" //Acquisto    
            }
            
            return "sap-icon://question-mark";
        },
        matTypeIconOLD: function(particleObj){
            //icone indicate da EF (mail del 20/12)
            //TODO: 2023/02/03 dismettere (sistemare il backend per utilizzare matTypeIcon)
            if(particleObj){
                if( particleObj.OITM.PlaningSys=="M") return "sap-icon://SAP-icons-TNT/requirement-diagram" //MRP
                else if(particleObj.OITM.PrcrmntMtd=="M" && particleObj.OITM.TreeType!="N") return "sap-icon://SAP-icons-TNT/bill-of-material" //Produzione+distinta
                else if(particleObj.parent_key) return "sap-icon://add-product" //Componente distinta
                else if(particleObj.OITM.PrcrmntMtd=="B") return "sap-icon://product" //Acquisto    
            }
            
            return "sap-icon://question-mark";
        },
        
    };
});
