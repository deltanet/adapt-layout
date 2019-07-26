# adapt-layout

**Layout** is an *extension* for the [Adapt framework](https://github.com/adaptlearning/adapt_framework).   

This extension offers different options for the screen layout.

## Installation

This extension must be manually installed.

If **Layout** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

## Settings Overview

**Layout** is configured at course (*course.json*),  block (*blocks.json*) and component (*components.json*) level.

The attributes listed below are properly formatted as JSON in [*example.json*](https://github.com/deltanet/adapt-layout/blob/master/example.json).  

### Attributes

**Course**  

The Layout attribute group contains values for **_isEnabled**, **_disableOnMobile**, **_fullHeightEnabled**, and **_customHeight**.

>**_isEnabled** (boolean):  Turns on and off the **Layout** extension. Can be set to disable **Layout** when not required.  

>**_disableOnMobile** (boolean):  If set to `true`, the extension will be disabled on mobile devices.

>**_fullHeightEnabled** (boolean):  If set to `true`, all Articles and their Blocks will be set to the height of the device.  

>**_customHeight** (object):  This `_customHeight` attributes group stores the properties for adding a custom height for the Articles and their Blocks. It contains values for **_isEnabled**, and **_minHeight**.  

>>**_isEnabled** (boolean): If set to `true`, the specified minimum height will be added to all Articles and their Blocks.

>>**_minHeight** (number): Defines the CSS min-height.  

**Block**  

The Layout attribute group at block level contains values for **_isEnabled**, **_disableFullHeight**, and **_componentWidths**.

>**_isEnabled** (boolean):  Turns on and off the **Layout** extension. Can be set to disable **Layout** when not required.  

>**_disableFullHeight** (boolean):  If enabled the fullheight functionality will not be applied to the block.  

>**_componentWidths** (object):  This `_componentWidths` attributes group stores the properties for changing the width of the components within the block. It contains values for **_isEnabled**, **_left** and **_right**.

>>**_left** (number): Sets the width of the left component when viewed on a large device.

>>**_right** (number): Sets the width of the right component when viewed on a large device.

**Component**  

The Layout attribute group at component level contains values for **_isEnabled**, and **_hideoOn**.

>**_isEnabled** (boolean):  Turns on and off the **Layout** extension. Can be set to disable **Layout** when not required.  

>**_hideoOn** (string):  Defines which devices the component is hidden on.   


## Limitations

No known limitations.

----------------------------
**Version number:**  2.3.0    
**Framework versions supported:**  2.0.4    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-layout/graphs/contributors)     
**Accessibility support:** Yes    
**RTL support:** Yes    
**Authoring tool support:** yes
