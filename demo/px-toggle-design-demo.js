/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* Common imports */
/* Common demo imports */
/* Demo DOM module */
/* 6: Handle selectedOptions, update demo */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-sass-doc/px-sass-doc.js';
import '../css/px-toggle-design-demo-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
  <!-- 0: Import the styles-->
  <style include="px-toggle-design-demo-styles" is="custom-style"></style>

<!-- 1: Describe Module -->
<px-sass-doc module-name="px-toggle-design" description="Toggle is a simple on/off switch. It's created with CSS applied to a checkbox and label. Use it to create simple UI elements that enable and disable things. We recommend using the px-toggle component in your application." layer="objects" sassdoc-path="sassdoc.json" dependencies="[
    &quot;https://github.com/PredixDev/px-colors-design&quot;,
    &quot;https://github.com/PredixDev/px-defaults-design&quot;,
    &quot;https://github.com/PredixDev/px-helpers-design&quot;
  ]" selected-options="{{selectedOptions}}">

<!-- 2: Set Options -->
<px-sass-doc-option slot="options" option-name="Size" choose-with="dropdown" choices="[
    &quot;small&quot;,
    &quot;regular (default)&quot;,
    &quot;large&quot;,
    &quot;huge&quot;
  ]" default-choice="regular (default)">
</px-sass-doc-option>

<px-sass-doc-option slot="options" option-name="Disabled" choose-with="boolean" default-choice="false">
</px-sass-doc-option>

<!-- 3: Make HTML Demo -->
<section slot="demo-html">
<input id="example" class\$="{{inputClasses}}" type="checkbox" checked\$="{{togglesChecked::change}}" disabled\$="{{disabled}}">
<label for="example" class\$="{{labelClasses}}"></label>
</section>

<!-- 4: Set Import Slot -->
<section slot="import">
{{importCode}}
</section>

<!-- 5: Set Usage HTML -->
<section slot="usage-html">
<!-- Default toggle -->
<input id="toggle2" class="toggle__input" type="checkbox">
<label for="toggle2" class="toggle__label"></label>
<!-- Small toggle -->
<input id="toggle3" class="toggle__input toggle__input--small" type="checkbox">
<label for="toggle3" class="toggle__label toggle__label--small"></label>
<!-- Large toggle -->
<input id="toggle4" class="toggle__input toggle__input--large" type="checkbox">
<label for="toggle4" class="toggle__label toggle__label--large"></label>
<!-- Huge toggle -->
<input id="toggle5" class="toggle__input toggle__input--huge" type="checkbox">
<label for="toggle5" class="toggle__label toggle__label--huge"></label>
</section>

<!-- 5: Set Usage Info -->
<section slot="usage">
Toggles are just fancy checkboxes. After you import the toggle library, you can add classes to an \`<input>\` tag and \`<label>\` tag to create your toggle element.

You can create a basic toggle with the following code:

\`\`\`
<!-- HTML and CSS get the job done, no JavaScript required -->
<input id="simpleToggle" class="toggle__input" type="checkbox">
<label for="simpleToggle" class="toggle__label"></label>
\`\`\`

### Important things to remember

#### Order matters (input before label)

Your \`input\` tag *must* come right before your \`label\` tag, exactly as the code appears in the example above. The toggle relies on CSS's <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_selectors">adjacent sibling selector</a>. If you don't place the tags in the right order, the toggle won't work.

#### Match your input \`id\` and label \`for\`

Your \`id\` attribute on your \`input\` tag should match the \`for\` attribute on your \`label\` tag to keep them in sync:

\`\`\`
<!-- Input and label must have the same ID -->
<input id="SAME_VALUE" class="toggle__input" type="checkbox">
<label for="SAME_VALUE" class="toggle__label"></label>
\`\`\`

#### Keep classes in sync

Both the \`input\` and \`label\` tags should have the same modifiers as their sibling. For example, if you're using a small toggle, make sure you apply the \`toggle__input--small\` class and the \`toggle__label--small\` class like the example below:


\`\`\`
<!-- Small modifier on both input and label -->
<input id="toggle3" class="toggle__input toggle__input--small" type="checkbox">
<label for="toggle3" class="toggle__label toggle__label--small"></label>
\`\`\`

### All the possible toggles

Here are all the possible toggles you could use. Remember, you'll need to set the correct flags before importing the toggle module (see instructions above):

\`\`\`
<!-- Small toggle -->
<input id="small" class="toggle__input toggle__input--small" type="checkbox">
<label for="small" class="toggle__label toggle__label--small"></label>

<!-- Regular toggle -->
<input id="regular" class="toggle__input" type="checkbox">
<label for="regular" class="toggle__label"></label>

<!-- Large toggle -->
<input id="large" class="toggle__input toggle__input--large" type="checkbox">
<label for="large" class="toggle__label toggle__label--large"></label>

<!-- Huge toggle -->
<input id="huge" class="toggle__input toggle__input--huge" type="checkbox">
<label for="huge" class="toggle__label toggle__label--huge"></label>

<!-- Disabled toggle -->
<input id="disabled" class="toggle__input" type="checkbox" disabled="">
<label for="disabled" class="toggle__label toggle--disabled"></label>
\`\`\`
</label></section>

</px-sass-doc>
`,

  is: 'px-toggle-design-demo',

  attached : function(){
    var boundHandler = this._handleOptionsUpdated.bind(this);
    this.addEventListener('px-sass-doc-options-updated', boundHandler);
    this._toggleCheckedAttribute();
  },

  detached : function(){
    this.removeEventListener('px-sass-doc-options-updated', boundHandler);
  },

  _handleOptionsUpdated : function(evt) {
    //call functions created below
    this.inputClasses = this._inputClasses();
    this.labelClasses = this._labelClasses();
    this.importCode = this._importCode();
    this.disabled = this.selectedOptions.Disabled;

    // Wait, then tell the highlighter to run after dom-if restamps
    this.async(function(){ this.fire('px-sass-doc-demo-updated', {}) }, 10);
  },

  _toggleCheckedAttribute : function(evt) {
    this.togglesChecked = false;
    this.listen(this.$.example, 'tap', 'toggleToggles');
    this.toggleToggles = function(evt) {
      this.togglesChecked = !this.togglesChecked;
    };
  },

  _inputClasses : function() {
    var opts = this.selectedOptions || {}, strings = [];

    if (opts.Size === "small")    strings.push("toggle__input--small");
    if (opts.Size === "large")    strings.push("toggle__input--large");
    if (opts.Size === "huge")     strings.push("toggle__input--huge");

    return ("toggle__input " + strings.join(" ")).trim();
  },

  _labelClasses : function() {
    var opts = this.selectedOptions || {}, strings = [];

    if (opts.Size === "small")    strings.push("toggle__label--small");
    if (opts.Size === "large")    strings.push("toggle__label--large");
    if (opts.Size === "huge")     strings.push("toggle__label--huge");
    if (opts.Disabled)            strings.push("toggle--disabled");

    return ("toggle__label " + strings.join(" ")).trim();
  },

  _importCode : function() {
    var opts = this.selectedOptions || {}, strings = [];

    if (opts.Size === "small")      strings.push("inuit-enable-toggle--small : true;");
    if (opts.Size === "large")      strings.push("inuit-enable-toggle--large : true;");
    if (opts.Size === "huge")       strings.push("inuit-enable-toggle--huge : true;");
    if (opts.Disabled)              strings.push("inuit-enable-toggle--disabled : true;");

    return (strings.join("\n") + "\n@import 'px-toggle-design/_objects.toggle.scss';").trim();
  }
});
