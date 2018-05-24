function dropdown() {
  var dropDown = document.querySelectorAll('.nav-js .dropdown a');
  var dropDownMenu = document.querySelector('.dropdown-menu');


  for (var x = 0; x < dropDown.length; x++) {
    dropDown[x].addEventListener('click', function(e) {

      var dropdownTarget = this.nextElementSibling

      if (e.target.nextElementSibling != null) {
        // Hide the dropdown
        dropdownTarget.classList.toggle('hidden');

        // Toggle aria expanded attribute
        ariaToggle(this);

        // Click outside of dropdown to also close
        hideOnClickOutside(this);
        e.preventDefault();
      }

    })
  }

  function hideOnClickOutside(element) {
    var outsideClickListener = function(event) {
      if (!element.contains(event.target)) {
        if (!!element && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)) {
          element.nextElementSibling.classList.toggle('hidden');
          removeClickListener();
        }
      }
    }

    var removeClickListener = function() {
      document.removeEventListener('click', outsideClickListener);
    }

    document.addEventListener('click', outsideClickListener);
  }


  function ariaToggle(toggle) {
    if (toggle.getAttribute('aria-expanded') == 'false') {
      toggle.setAttribute('aria-expanded', 'true');
    } else {
      toggle.setAttribute('aria-expanded', 'false');
    }
  }
}

dropdown();

function toggleNav() {

  var navToggles = document.querySelectorAll('[data-toggle=toggle]');

  navToggles.forEach(function(toggle) {
    var menuTarget = toggle.dataset.target;
    var collapse = document.querySelector(menuTarget);

    toggle.addEventListener('click', function() {
      collapse.classList.toggle('show');
    });

  });
}
toggleNav();