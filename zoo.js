
  var animal= [
    {
      "id": "rivers-edge",
      "name": "River's Edge",
      "animal": "Hippopotame",
      "color": "#bc4927",
      "description": "Les hippopotames font partie des plus grands mammifères terrestres, seulement dépassés en poids par les éléphants. Ils font de 2,09 à 5,05 m de long (y compris la queue, longue de 35 à 56 cm) et de 1,09 à 1,65 m de haut au garrot. Leur poids peut atteindre 3 200 kg.",
      "habitat": "Rivières et lacs d'Afrique",
      "image": "hippo.svg",
      "svgDescription": "Image d'un hippopotame dans l'eau, avec des yeux et des oreilles visibles au-dessus de la surface.",
      "type": {
            "image1": "hippo.jpg",
            "image2": "hippo.jpg",
            "image3": "hippo.jpg",
        }
    },
    {
      "id": "red_rocks",
      "name": "Red Rocks",
      "animal": "Lion",
      "color": "#e52954",
      "description": "Le Lion est une espèce de mammifères carnivores de la famille des Félidés. La femelle du lion est la lionne, son petit est le lionceau. Le mâle adulte, aisément reconnaissable à son importante crinière, accuse une masse moyenne qui peut être variable selon les zones géographiques où il se trouve, allant de 145 à 180 kg pour les lions d'Asie à plus de 225 kg pour les lions d'Afrique.",
      "habitat": "Forêts et savanes d'Afrique et d'Asie",
      "image": "lionrouge.svg",
      "svgDescription": "Image d'un lion, avec une crinière majestueuse et un regard puissant.",
      "type": {
            "image1": "lion.jpg",
            "image2": "lion.jpg",
            "image3": "lion.jpg",
        }

    },
    {
      "id": "discovery_corner",
      "name": "Discovery Corner",
      "animal": "Perroquet",
      "color": "#57528f",
      "description": "Ces oiseaux sont connus et fascinent les hommes par leurs couleurs, leur intelligence et leur aptitude à parler depuis des siècles. Du symbole religieux amérindien à la représentation de la condition humaine dans la littérature médiévale européenne, ces oiseaux ont toujours laissé des traces dans la culture humaine.",
      "habitat": "Forêts tropicales",
      "image": "papillon.svg",
      "svgDescription": "Image d'un perroquet perché, aux plumes multicolores.",
      "type": {
            "image1": "perroque.jpg",
            "image2": "perroque.jpg",
            "image3": "perroque.jpg",
        }
    },
    {
      "id": "the_wild",
      "name": "The Wild",
      "animal": "Ours",
      "color": "#548bc9",
      "description": "Les ours forment la famille de mammifères des Ursidés (Ursidae), de l'ordre des Carnivores (Carnivora). Le Grand panda, dont la classification a longtemps prêté à débat, est aujourd'hui considéré comme un ours herbivore au sein de cette famille.",
      "habitat": "Forêts boréales et montagnes",
      "image": "ours.svg",
      "svgDescription": "Image d'un ours brun marchant sur deux pattes, avec un regard curieux.",
      "type": {
            "image1": "ours.jpg",
            "image2": "ours.jpg",
            "image3": "ours.jpg",
        }
    },

    {
      "id": "lakeside_crossing",
      "name": "Lakeside Crossing",
      "animal": "Phoque",
      "color": "#c7912c",
      "description": "Le phoque veau-marin, ou phoque commun, est un mammifère marin carnivore de la famille des phocidés. Son espérance de vie peut atteindre 25 ans pour le mâle.",
      "habitat": "Lacs et côtes maritimes",
      "image": "dauphin.svg",
      "svgDescription": "Image d'un phoque sautant hors de l'eau, avec des éclaboussures autour.",
      "type": {
            "image1": "phoque.jpg",
            "image2": "phoque.jpg",
            "image3": "phoque.jpg",
        }
    },
    {
      "id": "historic_hill",
      "name": "Historic Hill",
      "animal": "Bonobo",
      "color": "#819b4c",
      "description": "Le Bonobo, Chimpanzé nain ou Chimpanzé pygmée est une espèce de primates de la famille des Hominidés, proche du Chimpanzé commun.",
      "habitat": "Forêts tropicales d'Afrique centrale",
      "image": "bonobo.svg",
      "svgDescription": "Image d'un bonobo assis, avec un regard amical et des mains posées sur les genoux.",
      "type": {
            "image1": "bonobo.jpg",
            "image2": "bonobo.jpg",
            "image3": "bonobo.jpg",
        }
    },
  ]

  // Dimensions de la carte complète (viewBox d'origine du SVG)
  var MAP_WIDTH = 720;
  var MAP_HEIGHT = 362;
  var TOUR_DELAY = 4000; // durée d'une étape de la visite guidée (ms)

  var currentZoneId = null;
  var tourTimer = null;
  var zoomFrame = null;

  function findAnimal(id) {
    return animal.find(function (a) {
      return a.id === id;
    });
  }

  // Fiche affichée tant qu'aucune zone n'est sélectionnée
  function displayWelcome() {
    $('#zoo-info').html(
        '<div class="fiche fiche--empty zoo-panel">' +
          '<p class="label">Fiche de terrain</p>' +
          '<h3 class="fiche__title">Choisissez une zone</h3>' +
          '<p>Touchez une des ' + animal.length + ' zones du plan ou de la légende, ou lancez la visite guidée pour toutes les parcourir.</p>' +
        '</div>'
    );
  }

  function displayAnimalInfo(animalData) {
    if (animalData) {
        var position = animal.indexOf(animalData) + 1;
        // Affichage des images du type (sans les doublons)
        var imagesHtml = '';
        if (animalData.type) {
            Object.values(animalData.type).filter(function (imgPath, i, all) {
                return all.indexOf(imgPath) === i;
            }).forEach(function (imgPath) {
                imagesHtml += '<figure class="fiche__photo"><img src="images/' + imgPath + '" alt="' + animalData.svgDescription + '"></figure>';
            });
        }
        $('#zoo-info').html(
            '<article class="fiche zoo-panel" style="--zone:' + animalData.color + ';">' +
              imagesHtml +
              '<div class="fiche__body">' +
                '<p class="label">Zone 0' + position + ' / 0' + animal.length + '</p>' +
                '<div class="fiche__head">' +
                  '<div>' +
                    '<h3 class="fiche__title">' + animalData.name + '</h3>' +
                    '<p class="fiche__animal">' + animalData.animal + '</p>' +
                  '</div>' +
                  '<img src="svg/' + animalData.image + '" alt="" class="fiche__icon">' +
                '</div>' +
                '<p class="fiche__text">' + animalData.description + '</p>' +
                '<dl class="fiche__facts"><dt class="label">Habitat</dt><dd>' + animalData.habitat + '</dd></dl>' +
                '<div class="fiche__nav">' +
                  '<button type="button" class="js-zone-prev btn btn--ghost btn--small">← Préc.</button>' +
                  '<button type="button" id="close-zoo-info" class="fiche__close label">Fermer</button>' +
                  '<button type="button" class="js-zone-next btn btn--ghost btn--small">Suiv. →</button>' +
                '</div>' +
              '</div>' +
            '</article>'
        );
    }
  }

  // Calcule le viewBox qui cadre une zone, au même format que la carte
  function zoneView(group) {
    var box = group.getBBox();
    var ratio = MAP_WIDTH / MAP_HEIGHT;
    var width = Math.max(box.width * 1.5, box.height * 1.5 * ratio, MAP_WIDTH * 0.6);
    width = Math.min(width, MAP_WIDTH);
    var height = width / ratio;
    var x = Math.min(Math.max(box.x + box.width / 2 - width / 2, 0), MAP_WIDTH - width);
    var y = Math.min(Math.max(box.y + box.height / 2 - height / 2, 0), MAP_HEIGHT - height);
    return [x, y, width, height];
  }

  // Anime le viewBox du SVG vers la vue demandée
  function zoomTo(target) {
    var svg = document.getElementById('zoo-map');
    var from = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number);
    var duration = 500;
    var start = null;

    cancelAnimationFrame(zoomFrame);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      svg.setAttribute('viewBox', target.join(' '));
      return;
    }
    function step(timestamp) {
      if (start === null) {
        start = timestamp;
      }
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      svg.setAttribute('viewBox', from.map(function (value, i) {
        return value + (target[i] - value) * eased;
      }).join(' '));
      if (progress < 1) {
        zoomFrame = requestAnimationFrame(step);
      }
    }
    zoomFrame = requestAnimationFrame(step);
  }

  function selectZone(id) {
    var animalData = findAnimal(id);
    if (!animalData) {
      return;
    }
    currentZoneId = id;
    $('#zoo-map').addClass('has-selection');
    $('.js-map-group').removeClass('is-active').attr('aria-pressed', 'false');
    $('#' + id).addClass('is-active').attr('aria-pressed', 'true');
    $('.zone-chip').removeClass('is-active');
    $('.zone-chip[data-zone="' + id + '"]').addClass('is-active');
    displayAnimalInfo(animalData);
    zoomTo(zoneView(document.getElementById(id)));
  }

  function clearSelection() {
    currentZoneId = null;
    $('#zoo-map').removeClass('has-selection');
    $('.js-map-group').removeClass('is-active').attr('aria-pressed', 'false');
    $('.zone-chip').removeClass('is-active');
    displayWelcome();
    zoomTo([0, 0, MAP_WIDTH, MAP_HEIGHT]);
  }

  // Passe à la zone suivante (step = 1) ou précédente (step = -1)
  function stepZone(step) {
    var index = animal.indexOf(findAnimal(currentZoneId));
    var next = (index + step + animal.length) % animal.length;
    selectZone(animal[next].id);
  }

  function stopTour() {
    clearInterval(tourTimer);
    tourTimer = null;
    $('#tour-btn').text('▶ Visite guidée');
  }

  function startTour() {
    $('#tour-btn').text('■ Arrêter la visite');
    stepZone(1);
    tourTimer = setInterval(function () {
      stepZone(1);
    }, TOUR_DELAY);
  }

  $(document).ready(function () {
      var $tooltip = $('<div id="map-tooltip" role="presentation"></div>').appendTo('#map-wrap');

      // Rendre chaque zone de la carte utilisable au clavier et créer la légende
      animal.forEach(function (animalData) {
        var label = animalData.name + ' – ' + animalData.animal;
        $('#' + animalData.id)
          .attr({ tabindex: 0, role: 'button', 'aria-label': label, 'aria-pressed': 'false' })
          .children('title').remove();
        $('<button type="button" class="zone-chip"></button>')
          .attr('data-zone', animalData.id)
          .css('--zone', animalData.color)
          .text(label)
          .appendTo('#zone-chips');
      });

      displayWelcome();

      // Sélection d'une zone au clic ou au clavier
      $('.js-map-group').on('click', function () {
        stopTour();
        selectZone(this.id);
      });
      $('.js-map-group').on('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          stopTour();
          selectZone(this.id);
        }
      });
      $('#zone-chips').on('click', '.zone-chip', function () {
        stopTour();
        selectZone($(this).attr('data-zone'));
      });

      // Info-bulle qui suit la souris sur la carte
      $('.js-map-group').on('mousemove', function (event) {
        var animalData = findAnimal(this.id);
        var wrap = document.getElementById('map-wrap').getBoundingClientRect();
        $tooltip
          .text(animalData.name + ' – ' + animalData.animal)
          .css({ left: event.clientX - wrap.left, top: event.clientY - wrap.top })
          .addClass('show');
      });
      $('.js-map-group').on('mouseleave', function () {
        $tooltip.removeClass('show');
      });

      // Boutons de la fiche (recréés à chaque affichage, d'où la délégation)
      $('#zoo-info').on('click', '.js-zone-prev', function () {
        stopTour();
        stepZone(-1);
      });
      $('#zoo-info').on('click', '.js-zone-next', function () {
        stopTour();
        stepZone(1);
      });
      $('#zoo-info').on('click', '#close-zoo-info', function () {
        stopTour();
        clearSelection();
      });

      $('#reset-view').on('click', function () {
        stopTour();
        clearSelection();
      });
      $('#tour-btn').on('click', function () {
        if (tourTimer) {
          stopTour();
        } else {
          startTour();
        }
      });

      // Échap ferme la fiche et revient à la vue d'ensemble
      $(document).on('keydown', function (event) {
        if (event.key === 'Escape' && currentZoneId) {
          stopTour();
          clearSelection();
        }
      });
    });
