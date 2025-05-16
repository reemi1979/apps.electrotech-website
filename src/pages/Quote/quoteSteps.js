
export const quoteSteps = [
  {
    name: 'Main',
    fields: [
      {
        label: 'Control Panel Name',
        placeholder: 'Enter Your Control Panel Name Here',
        type: 'textfield',
        key: 'panel_name',
        shrink: true
      },
      {
        label: 'Main Entry Voltage',
        type: 'dropdown',
        key: 'panel_voltage',
        options: ['24VDC', '120VAC', '208VAC', '240VAC', '400VAC', '480VAC', '600VAC', 'Other']
      }
    ]
  },
  {
    name: 'Cabinet',
    fields: [
      {
        label: 'Cabinet',
        type: 'addButton',
        key: 'cabinet',
        fields: [
          {
            label: 'Use Cabinet Part Number ?',
            type: 'toggle',
            key: 'cabinet_have_part',
            topRow: true
          },
          {
            label: 'Cabinet Part Number',
            placeholder: 'Enter You Cabinet Part Number',
            type: 'textfield',
            key: 'cabinet_part',
            condition: (item) => item.cabinet_have_part === 'yes'
          },
          {
            label: 'Cabinet Brand',
            type: 'dropdown',
            key: 'cabinet_brand',
            options: ['Rittal','Hammond', 'Hoffman', 'EXM', 'Other'],
            condition: (item) => item.cabinet_have_part === 'no'
          },
          {
            label: 'Cabinet Type',
            type: 'dropdown',
            key: 'cabinet_type',
            options: ['Single Door', 'Double Door', 'Modular', 'Junction Box', 'Button Box','Other'],
            condition: (item) => item.cabinet_have_part === 'no'
          },
          {
            label: 'Cabinet Material',
            type: 'dropdown',
            key: 'cabinet_material',
            options: ['Mild Steel', 'Stainless Steel', 'Non-Mettalic', 'Other'],
            condition: (item) => item.cabinet_have_part === 'no'
          },
          { 
            label: 'Height', 
            type: 'dropdown', 
            key: 'cabinet_height', 
            options: ['12"', '16"','20"','24"','30"','36"','42"','48"','60"','72"'],
            condition: (item) =>
              item.cabinet_have_part === 'no' &&
              (item.cabinet_type === 'Single Door' || item.cabinet_type === 'Double Door')
          },
          { 
            label: 'Width', 
            type: 'dropdown', 
            key: 'cabinet_width', 
            options: ['12"', '16"','20"','24"','30"','36"','42"','48"','60"','72"'],
            condition: (item) =>
              item.cabinet_have_part === 'no' &&
              (item.cabinet_type === 'Single Door' || item.cabinet_type === 'Double Door')
          },
          { 
            label: 'Nema', 
            type: 'dropdown', 
            key: 'cabinet_nema', 
            options: ['NEMA 12', 'NEMA 4', 'NEMA 4X', 'NEMA 3R', 'Other'] ,
            condition: (item) => item.cabinet_have_part === 'no'
          },
          { label: 'Quantity', type: 'dropdown', key: 'cabinet_qty', options: ['1', '2', '3', '4', 'Other'] },
        ]
      },
      {
        label: 'Cabinet Fans',
        type: 'addButton',
        key: 'cabinet_fan',
        fields: [
          { label: 'Voltage', type: 'dropdown', key: 'cabinet_fan_voltage', options: ['24V', '120V', 'Other'] },
          { label: 'Size', type: 'dropdown', key: 'cabinet_fan_size', options: ['6"', '8"', '10"', '12"', 'Other'] },
          { label: 'Quantity', type: 'dropdown', key: 'cabinet_fan_qty', options: ['1', '2', '3', '4', 'Other'] },
        ]
      },
      {
        label: 'Cabinet Lights',
        type: 'addButton',
        key: 'cabinet_light',
        fields: [
          { label: 'Voltage', type: 'dropdown', key: 'cabinet_light_voltage', options: ['24V', '120V', 'Other'] },
          { label: 'Quantity', type: 'dropdown', key: 'cabinet_light_qty', options: ['1', '2', '3', '4', 'Other'] },

        ]
      }
    ]
  },
  {
    name: 'Power',
    fields: [
      {
        label: 'Motors Controllers',
        type: 'addButton',
        key: 'motors',
        fields: [
          { label: 'Controled By', type: 'dropdown', key: 'motor_driver', options: ['Drive', 'Contactor', 'Other'] },
          { 
            label: 'Brand', 
            type: 'dropdown', 
            key: 'drive_brand', 
            options: ['Allen-Bradley', 'Schneider', 'ABB', 'SEW', 'Siemens', 'Other'],
            condition: (item) => item.motor_driver === 'Drive'
          },
          {
            label: 'Model Drive',
            type: 'dropdown',
            key: 'drive_model_allenbradley',
            options: ['Power Flex 525', 'Power Flex 700', 'Power Flex 700S', 'Power Flex 753', 'Power Flex 755', 'Other'],
            condition: (item) => item.motor_driver === 'Drive' && item.drive_brand === 'Allen-Bradley'
          },
          {
            label: 'Model Contactor',
            type: 'dropdown',
            key: 'contactor_model_schneider',
            options: ['AB_100C', 'AB_100S', 'Schneider_LC1D', 'Siemens_3RA', 'Siemens_3RT', 'Other'],
            condition: (item) => item.motor_driver === 'Contactor'
          },
          {
            label: 'HP',
            type: 'dropdown',
            key: 'motor_hp',
            options: ['<1 HP', '~2 HP', '~3 HP','~5 HP', '~7.5 HP', '~10 HP', '~15 HP', '~20 HP', '~30 HP', '~40 HP', '~50 HP', '>50 HP', 'Other'],
            condition: (item) => item.motor_driver === 'Drive' || item.motor_driver === 'Contactor'
          },
          {
            label: 'Protection',
            type: 'dropdown',
            key: 'motor_protection',
            options: ['Fuses', 'Motor Starter', 'Breaker'],
            condition: (item) => item.motor_driver === 'Drive' || item.motor_driver === 'Contactor'
          },
          {
            label: 'Line Filter In',
            type: 'dropdown',
            key: 'drive_lf_input_drive',
            options: ['Yes', 'No'],
            condition: (item) => item.motor_driver === 'Drive'
          },
          {
            label: 'Line Filter Out',
            type: 'dropdown',
            key: 'drive_lf_output_drive',
            options: ['Yes', 'No'],
            condition: (item) => item.motor_driver === 'Drive'
          },
          {
            label: 'Model Fuses',
            type: 'dropdown',
            key: 'motor_model_fuses',
            options: ['AB_1492-FB', 'Ferraz_USCC/J', 'Bussman_CHCC', 'Siemens_3NW', 'ABB_E93', 'Other'],
            condition: (item) => item.motor_protection === 'Fuses'
          },
          {
            label: 'Model Motor Starter',
            type: 'dropdown',
            key: 'motor_model_mms',
            options: ['AB_140M', 'Schneider_GV2', 'Schneider_GV3', 'Siemens_3RV', 'Other'],
            condition: (item) => item.motor_protection === 'Motor Starter'
          },
          {
            label: 'Breaker',
            type: 'dropdown',
            key: 'motor_model_breaker',
            options: ['AB_1489', 'Schneider_M9F4', 'Siemens_5SJ4', 'Other'],
            condition: (item) => item.motor_protection === 'Breaker'
          },
          { label: 'Quantity', type: 'dropdown', key: 'motor_qty', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Other'] },
        ]
      }
    ]
  }
];
