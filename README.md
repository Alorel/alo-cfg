Provides an easy and convenient way to manage client-side configuration via data attributes. See [this fiddle](https://jsfiddle.net/Alorel/yn74gwj0/) for a demo.

# Requirements
alo-cfg only requires **localStorage** and **sessionStorage** to be available. You'll need to use [one of the many available polyfills](http://lmgtfy.com/?q=web+storage+polyfill) if your project is still visited by dinosaurs.

# Installation
```html
<script src="alo-cfg.min.js"></script>
```

# Usage
## HTML
Simply add a **data-cfg=some_key** attribute to a HTML input element, e.g.:
```html
<!-- Stores the entered value -->
<input name="some" data-cfg="foo"/>
<!-- Stores the selected value -->
<input name="thing" type="radio" data-cfg="bullet"/>
<input name="thing" type="radio" data-cfg="bullet"/>
<!-- Stores the 1 or 0 -->
<input name="orAnother" type="checkbox" data-cfg="tick"/>
```

## Javascript
### Adding the change/keyup event listeners
You can automatically save updated values using the **bind** method which accepts 2 parameters - the **HTMLElement** containing your form (defaults to **document.body**) and
whether the storage used should be volatile (*sessionStorage*) or persistent (*localStorage, default value*):

```js
// Bind to all inputs containing [data-cfg] on the page in a persistent manner
AloCfg.bind();

// Bind to all inputs containing [data-cfg] in a container in a persistent manner
AloCfg.bind(document.getElementById("myForm"));

// Bind to all inputs containing [data-cfg] on the page in a volatile manner
AloCfg.bind(document.body, true);

// Bind to all inputs containing [data-cfg] in a container in a volatile manner
AloCfg.bind(document.getElementById("myForm"), true);
```

### Manually updating local/session storage
You can also trigger storage updates manually using the **update** method which accepts 2 parameters - the **HTMLElement** containing your form (defaults to **document.body**) and
whether the storage used should be volatile (*sessionStorage*) or persistent (*localStorage, default value*):

```js
// Parse all inputs containing [data-cfg] on the page in a persistent manner
AloCfg.update();

// Parse all inputs containing [data-cfg] in a container in a persistent manner
AloCfg.update(document.getElementById("myForm"));

// Parse all inputs containing [data-cfg] on the page in a volatile manner
AloCfg.update(document.body, true);

// Parse all inputs containing [data-cfg] in a container in a volatile manner
AloCfg.update(document.getElementById("myForm"), true);
```

### Setting your own key prefix
By default, all config keys are stored with the **alo** prefix, e.g. if your *data-cfg* attribute contains the value *foo* your
key in session/local storage would be **alo_foo*. The prefix can be changed using the **setPrefix** method:

```js
AloCfg.setPrefix("bar"); // The above data-cfg attribute would now result in the bar_foo key
```

### Automatically setting values from session/local storage
Of course, you'll want to use your stored values too - for this you can call the **setValues** method, which accepts one parameter -
a **HTMLElement** containing your form (defaults to **document.body**).

```js
// Update the entire page:
AloCfg.setValues();

// Or just your form:
AloCfg.setValues(document.getElementById("myForm"));
```

### Clearing stored values
All values can also be cleared. The **clear** method will remove all values containing the currently active prefix.

```js
// Remove all values with the default alo prefix
AloCfg.clear();

// Remove all values with some custom prefix
AloCfg.setPrefix("foo").clear();
```

### Removing a saved value
You can remove a single value too using the **remove** method. Just like the *clear* method, *remove* works on the currently active prefix.

```js
AloCfg.remove("foo");
// The above is equivalent to:
sessionStorage.removeItem("alo_foo");
localStorage.removeItem("alo_foo");

AloCfg.setPrefix("bar").remove("qux");
// The above is equivalent to:
sessionStorage.removeItem("bar_qux");
localStorage.removeItem("bar_qux");
```
