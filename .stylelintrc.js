module.exports = {
  "extends": ["stylelint-config-standard", "stylelint-config-rational-order", "stylelint-config-prettier"],
  "rules": {
    "indentation": "tab",
    "block-no-empty": true, 
    "selector-pseudo-class-no-unknown": [ true, {
      "ignorePseudoClasses": ["global"]
    } ],
    "color-no-invalid-hex": true,
    "color-hex-case": [  
      "lower", {  
      "message": "Lowercase letters are easier to distinguish from numbers"  
      }  
    ],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["extend", "mixin"]
      }
    ],
    "order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "rules",
      "at-rules"
    ]
  }
} 