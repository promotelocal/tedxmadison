$(function () {
  var hcj = window.hcj;
  var c = hcj.component;
  var color = hcj.color.create;
  var px = hcj.unit.px;
  var stream = hcj.stream;

  var sliderTransition = 1;
  var sliderHeight = 400;
  var colors = {
	black: color(),
	white: color({
	  r: 255,
	  g: 255,
	  b: 255,
	}),
	transparent: color({
	  a: 0,
	}),
	lighterGray: color({
	  r: 59,
	  g: 59,
	  b: 59,
	}),
	gray: color({
	  r: 85,
	  g: 85,
	  b: 85,
	}),
	red: color({
	  r: 255,
	  g: 43,
	  b: 6,
	}),
	redDark: color({
	  r: 235,
	  g: 35,
	  b: 0,
	}),
  };
  var fa = function (str) {
	return '<i class="fa fa-' + str + '"></i>';
  };
  var fonts = {
	h1: {
	  family: 'Lato',
	  size: px(37),
	},
	h2: {
	  family: 'Lato',
	  size: px(28),
	},
	p: {
	  family: 'Lato',
	  size: px(17),
	},
  };
  var bodyColumn = function (x) {
	return c.alignLRM()({
	  m: c.all([
		c.minWidth(1200),
	  ])(x),
	});
  };
  var headerLinks = [{
	name: 'Home',
	href: '#',
  }, {
	name: 'Ideas&nbsp;&amp;&nbsp;Speakers',
	href: '#ideas-speakers',
  }, {
	name: 'Organizers',
	href: '#organizers',
  }, {
	name: 'Community',
	href: '#community',
  }];
  var menuOpenS = stream.once(false);
  var headerBar = c.all([
	bodyColumn,
	c.margin({
	  all: 20,
	}),
	c.backgroundColor({
	  background: color({
		a: 1,
	  }),
	  font: colors.white,
	}),
  ])(c.sideBySide({
	surplusWidthFunc: hcj.funcs.surplusWidth.giveToNth(1),
  })([
	c.image({
	  src: './images/Header logo-01.png',
	  minWidth: 200,
	}),
	c.largestWidthThatFits()([
	  c.all([
		c.alignHRight,
		c.alignVMiddle,
	  ])(c.sideBySide({
		padding: 20,
	  })(headerLinks.map(function (l) {
		return c.all([
		  c.linkTo(l.href),
		])(c.text(l.name, [fonts.p, {
		  lineHeight: 1,
		  measureWidth: true,
		  oneLine: true,
		  family: 'Raleway',
		}]));
	  }))),
	  c.all([
		c.keepAspectRatio(),
		c.alignHRight,
		c.link,
		c.clickThis(function (ev) {
		  ev.stopPropagation();
		  stream.push(menuOpenS, !menuOpenS.lastValue);
		}),
		c.$$(function () {
		  $('body').on('click', function () {
			stream.push(menuOpenS, false);
		  });
		}),
	  ])(c.image({
		src: './images/menu.png',
		minHeight: 16,
	  })),
	]),
  ]));
  var dropdownOptions = c.stack()(headerLinks.map(function (l) {
	return c.all([
	  c.margin(20),
	  c.backgroundColor({
		background: color({
		  a: 0.7,
		}),
		font: colors.white,
	  }),
	  c.linkTo(l.href),
	])(c.text(l.name, [fonts.p, {
	  measureWidth: true,
	  oneLine: true,
	}]));
  }));
  var headerHeightS = stream.once(0);
  var header = c.all([
	c.$$(function ($el) {
	  setTimeout(function () {
		$el.css('position', 'fixed')
		  .css('z-index', 1);
	  });
	}),
	c.and(function (i, ctx) {
	  stream.pushAll(ctx.height, headerHeightS);
	}),
  ])(c.dropdownPanel(headerBar, dropdownOptions, menuOpenS));
  var anchor = function (id) {
	return c.$$(function ($el) {
	  var $anchor = $(document.createElement('a'))
			.css('position', 'absolute')
			.prop('id', id)
			.appendTo($el);
	  stream.onValue(headerHeightS, function (h) {
		$anchor.css('top', -h);
	  });
	});
  };
  var topView = c.all([
	c.keepAspectRatio({
	  fill: true,
	  // left: true,
	}),
  ])(c.image({
	src: './images/TedX-Banner2.jpg',
  }));
  var lilQuote = c.all([
	bodyColumn,
	c.margin(20),
  ])(c.grid({
	surplusWidthFunc: hcj.funcs.surplusWidth.giveToNth(0),
	padding: 20,
  })([
	c.alignTBM()({
	  m: c.text('We\'re paving the road to TEDx Madison 2016. Organizers are assembling the community, speakers, and sponsors. How can you help?', [fonts.p, {
		measureHeight: true,
		color: colors.gray,
		size: px(20),
		minWidth: 350,
	  }]),
	}),
	c.all([
	  c.margin({
		top: 15,
		bottom: 15,
		left: 25,
		right: 25,
	  }),
	  c.backgroundColor({
		background: colors.red,
		font: colors.white,
	  }),
	  c.linkTo('#community'),
	  c.alignVTop,
	  c.alignHLeft,
	])(c.text('Click&nbsp;Here', [fonts.p, {
	  measureWidth: true,
	  oneLine: true,
	}])),
  ]));
  var speakers = [{
	name: 'Jenie Gao',
	subject: 'Creativity and Logic as Partners',
	thumbSrc: './images/speakers/thumbnail_Jenine Gao - Grid-01.jpg',
	expandedSrc: './images/speakers/Jenine Gao - Expanded-01.jpg',
	bio: [
	  "Jenie Gao is an artist, writer, and disgustingly organized project manager. She sees her work as a teaching tool, a way to challenge conventional wisdom and invite others to do the same. Her artistic roots lie in the history of printmaking. She is known for her bold woodcuts, ink work, and allegorical storytelling style that address our universal&mdash;yet often isolating and divisive&mdash;human dilemmas.",
	  "Having worked across industries, from education to nonprofit to lean manufacturing, Jenie is passionate about cross-disciplinary work. She believes that fair access to creative education is fundamental to human prosperity and is a big proponent of the emerging maker movement, in using creativity and logic to foster our connection to how and why we make things.",
	  "Jenie continues to work collaboratively across the worlds of fine arts, business, and nonprofit. She advocates for the role of the arts in the building stronger, smarter, kinder communities.",
	],
  }, {
	name: 'Matt Gonnering',
	subject: 'Organizational Structure',
	thumbSrc: './images/speakers/thumbnail_Matt Gonnering - Grid-01.jpg',
	expandedSrc: './images/speakers/thumbnail_Matthew Gonnering - Expanded-01.jpg',
	bio: [
	  "Matthew Gonnering is the CEO of Widen, a marketing technology company founded in 1948. Blessed to work with highly intelligent, playful, self-starting Wideneers, Matthew has reshaped his role into &ldquo;Chief Eudaimonia Officer.&rdquo; His mission is to create happiness, health and prosperity for his colleagues, customers and community.",
	  "Matthew joined Widen in 2000 and became CEO in 2009. His team solves marketing and creative problems with digital asset management (DAM) software. Under Matthew's leadership, Widen has become a WorldBlu Freedom-Centered Workplace&#x2122; and a Madison Magazine Best Place to Work.  His ongoing commitment to faith, family, education, and nonprofit work shape his desire to ground organizational culture in humanity.",
	  "Matthew and his beautiful wife Sarah have five energetic children and reside in the Madison area.  He lives a eudaimonious life and encourages others to do the same.",
	],
  }, {
	name: 'Kelly Senecal',
	subject: 'In Defense of Internal Combustion',
	thumbSrc: './images/speakers/Kelly Senecal-Grid-01.jpg',
	expandedSrc: './images/speakers/Kelly Senecal - Expanded-01.jpg',
	bio: [
	  "Kelly Senecal is a co-founder and owner of Convergent Science, Inc. with headquarters in Madison, Wisconsin, and Convergent Science, GmbH with headquarters in Linz, Austria. Dr. Senecal is one of the original developers of the CONVERGE computational fluid dynamics software package. He is a consultant to the automotive industry and works closely with engineers on problems related to combustion modeling and other fluid flow phenomena. He is experienced at managing large consulting and software development projects for the private sector.",
	  "Dr. Senecal received his PhD from the University of Wisconsin-Madison.  He has written a number of research papers in the area of Computational Fluid Dynamics (CFD) of reactive flows. He has received international recognition for his pioneering work on the use of CFD in the engine design process, including articles in The New York Times and England\'s The Sunday Times. He is also the author of the widely used LISA (Linearized Instability Sheet Atomization) spray breakup model",
	],
  }, {
	name: 'Pupa Gilbert',
	subject: 'The Physics of Color',
	thumbSrc: './images/speakers/Pupa_Gilbert_Grid.jpg',
	expandedSrc: './images/speakers/Pupa_Gilbert.jpg',
	bio: [
	  "Pupa Gilbert is a professor of physics at UW-Madison, who studies biominerals, including seashells, sea urchin spines and teeth, and corals. She likes to figure out how they are formed by living organisms, who master physics and chemistry for their evolutionary advantage. She lives in Madison and Berkeley, teaches &#x201c;Physics in the Arts&#x201d;, and wrote a &#x201c;Physics in the Arts&#x201d; book co-authored with Willy Haeberli, published in English (2008, 2011) and Chinese (2011). She won several awards including: Knight of Italy (2001); Romnes 2002, Vilas 2006, Hamel 2008, and Chancellor Distinguished Teaching Award 2011 at UW-Madison; The Outstanding Young Persons of the world (TOYP-JCI, 1997); American Competitiveness and Innovation Award (ACI-NSF, 2008); American Physical Society Fellowship (2010); Science-NSF Visualizations Challenge (2012); BiophysicsART (2014); Radcliffe Fellowship (2014-2015, 2016). She loves to bridge the gap between art and science, is an art collector, enjoys traveling and wine making.",
	],
  }, {
	name: 'Mike Ford',
	subject: 'Hip-hop and Architecture',
	thumbSrc: './images/speakers/Mike_Ford_Grid.jpg',
	expandedSrc: './images/speakers/Mike_Ford.jpg',
	bio: [
	  "Born and raised in Detroit, Michael Ford, The Hip Hop Architect, is the designer of The Universal Hip Hop Museum. He has dedicated his professional career to stimulating cross disciplinary discourse on the sociological and cultural implications of architecture and urban planning on its inhabitants. Focusing on the intersection of the built environment and hip hop culture, through three interconnected realms; academia, media and practice, Ford&#x2019;s national Hip Hop Architecture lecture tour has included stops at Harvard&#x2019;s Graduate School of Design, University of Pennsylvania, South by Southwest and his alma matter University of Detroit Mercy, where he received his master&#x2019;s degree in architecture. Ford has worked as a designer at Hamilton Anderson Associates in Detroit and at Flad Architects in Madison, Wisconsin. Michael Ford serves on the board of Detroit&#x2019;s chapter of NOMA, The National Organization of Minority Architects and is currently a fulltime instructor at Madison College.",
	],
  }, {
	name: 'Tim Allen',
	subject: 'The Neglected Concept of Profit in Ecology',
	thumbSrc: './images/speakers/Tim_Allen-01_Grid.jpg',
	expandedSrc: './images/speakers/Tim_Allen-01.jpg',
	bio: [
	  "Timothy Allen is Professor Emeritus of Botany at the University of Wisconsin, Madison. He has been applying notions of complex systems and hierarchy theory to ecology for forty years. His first book, Hierarchy, perspectives for ecological complexity, Chicago Press 1982 established complex hierarchy theory and scaling in ecology (in press 2nd ed). His four other hierarchy theoretic books broaden across all types of ecology and beyond to the life and social sciences in general. He has published over 60 scholarly works in journals on community data analysis, agricultural systems, issues of scale, and sustainability. His latest book with T. Hoekstra is the 2nd ed of Toward a Unified Ecology, 2015. He enters the emerging field of economic ecology with J. Tainter considering complex societal collapse through diminishing return on investment. He marries rate-dependent thermodynamics with rate-independent constraint in complex ecological and social systems to predict changes.",
	],
  }];
  var speakerDialog = function (speaker, closeD) {
	return c.all([
	  c.backgroundColor({
		background: colors.black,
		font: colors.white,
	  }),
	])(c.grid({
	  surplusWidthFunc: hcj.funcs.surplusWidth.evenlySplit,
	  surplusHeightFunc: hcj.funcs.surplusHeight.giveToNth(0),
	})([
	  c.all([
		c.keepAspectRatio({
		  fill: true,
		}),
	  ])(c.image({
		src: speaker.expandedSrc,
		minWidth: 300,
	  })),
	  c.all([
	  	c.margin(40),
		c.minWidth(300),
	  ])(c.stack({
	  	surplusHeightFunc: hcj.funcs.surplusHeight.center,
	  	padding: 20,
	  })([
	  	c.text(speaker.name, [fonts.h1, {
	  	  measureWidth: true,
	  	  measureHeight: true,
	  	  align: 'center',
	  	}]),
	  	c.text(speaker.subject, [fonts.h1, {
	  	  measureWidth: true,
	  	  measureHeight: true,
	  	  align: 'center',
	  	}]),
	  	c.stack({
	  	  padding: 10,
	  	})(speaker.bio.map(function (paragraph) {
	  	  return c.text(paragraph, [fonts.p, {
	  		measureHeight: true,
	  	  }]);
	  	})),
	  	c.alignLRM()({
	  	  m: c.all([
	  		c.link,
	  		c.clickThis(function () {
	  		  closeD.resolve();
	  		}),
	  	  ])(c.text('X', [fonts.h1, {
	  		measureWidth: true,
	  		oneLine: true,
	  	  }])),
	  	}),
	  ])),
	]));
  };
  var speakerSliderArrow = function (amount, char, moveS) {
	return c.all([
	  c.margin(20),
	  c.border(colors.transparent, {
		radius: 1000,
	  }),
	  c.alignVMiddle,
	  c.link,
	  c.clickThis(function () {
		stream.push(moveS, {
		  amount: amount,
		});
	  }),
	])(c.text(char, [{
	  size: 80,
	  measureWidth: true,
	  oneLine: true,
	}]));
  };
  var openSpeakerDialog = function (index) {
	var closeD = $.Deferred();
	var moveS = stream.once({
	  amount: index,
	});
	var instance = hcj.rootComponent(c.all([
	  c.backgroundColor({
		background: colors.black,
		font: colors.white,
	  }),
	  c.minHeightStream(stream.map(hcj.viewport.heightS, hcj.funcs.constant)),
	  c.maxHeightStream(hcj.viewport.heightS),
	  c.$$(function ($el) {
		$el.css('opacity', '0')
		  .css('pointer-events', 'initial')
		  .css('z-index', 10000);
		setTimeout(function () {
		  $el.css('opacity', '1')
			.css('position', 'fixed')
			.css('transition', 'opacity 0.2s');
		});
	  }),
	])(c.sideBySide({
	  surplusWidthFunc: hcj.funcs.surplusWidth.giveToNth(1),
	})([
	  speakerSliderArrow(-1, '<', moveS),
	  c.slideshow({
		transitionTime: sliderTransition,
		moveS: moveS,
		alwaysFullWidth: true,
	  })(speakers.map(function (s) {
		return speakerDialog(s, closeD);
	  })),
	  speakerSliderArrow(1, '>', moveS),
	])), {
	  noBackground: true,
	});
	closeD.then(function () {
	  instance.destroy();
	});
  };

  var ideasAndSpeakers = c.all([
	bodyColumn,
	anchor('ideas-speakers'),
  ])(c.stack({
	padding: 20,
  })([
	c.text('Ideas &amp; Speakers', [fonts.h1, {
	  measureHeight: true,
	  align: 'center',
	}]),
	c.alignLRM()({
	  m: c.grid({
		useFullWidth: true,
		surplusWidthFunc: hcj.funcs.surplusWidth.centerFirstRowThenAlignLeft(),
		// surplusWidthFunc: hcj.funcs.surplusWidth.center,
	  })(speakers.map(function (s, index) {
		return c.all([
		  c.minWidth(300),
		  c.link,
		  c.clickThis(function () {
			openSpeakerDialog(index);
		  }),
		])(c.overlays()([
		  c.image({
			src: s.thumbSrc,
		  }),
		  c.all([
			c.margin(20),
		  ])(c.alignTBM()({
			b: c.stack({
			  padding: 10,
			})([
			  c.text(s.subject, [fonts.h2, {
				measureHeight: true,
			  }]),
			  c.text(s.name, [fonts.p, {
				measureHeight: true,
			  }]),
			]),
		  })),
		]));
	  })),
	}),
  ]));
  var faBackground = c.all([
	c.margin(10),
	c.border(colors.transparent, {
	  all: 1,
	  radius: 3,
	}),
	c.hoverColor({
	  backgroundColor: colors.transparent,
	  fontColor: colors.lighterGray,
	  hoverBackgroundColor: colors.white,
	  hoverFontColor: colors.red,
	  transition: 0.5,
	}),
  ]);
  var organizerList = [{
	name: 'Tiffanie Mark',
	position: 'Primary License Holder',
	src: './images/Tiffany-1.png',
	linkedIn: 'https://www.linkedin.com/in/tiffaniemark?authType=NAME_SEARCH&authToken=PPEj&locale=en_US&trk=tyah&trkInfo=clickedVerticalmynetworkclickedEntityId203931791authTypeNAME_SEARCHidx1-1-1tarId1472500311337tastiffan',
	email: 'mailto:tiffaniemark@matrixcbsolutions.com',
  }, {
	name: 'James Kokalj',
	position: 'Secondary License Holder',
	src: './images/james-darkened-01.jpg',
	linkedIn: 'https://www.linkedin.com/in/kokalj?authType=NAME_SEARCH&authToken=9ezo&locale=en_US&trk=tyah&trkInfo=clickedVerticalmynetworkclickedEntityId13500043authTypeNAME_SEARCHidx1-3-3tarId1472500378535tasjames',
	email: 'mailto:jameskokalj@gmail.com',
  }, {
	name: 'Dylan Shae Contois',
	position: 'Design',
	src: './images/dylan-1.png',
	linkedIn: 'https://www.linkedin.com/in/dylanshae?authType=NAME_SEARCH&authToken=JMRx&locale=en_US&trk=tyah&trkInfo=clickedVerticalmynetworkclickedEntityId167589062authTypeNAME_SEARCHidx1-1-1tarId1472500411073tasdylan',
	email: 'mailto:dylan@promotelocal.com',
  }, {
	name: 'Michelle Roach',
	position: 'Sponsorship Liaison',
	src: './images/michelle-darkened-01.jpg',
	linkedIn: 'https://www.linkedin.com/in/roachmichelle?authType=NAME_SEARCH&authToken=9wBS&locale=en_US&trk=tyah&trkInfo=clickedVerticalmynetworkclickedEntityId109535263authTypeNAME_SEARCHidx1-1-1tarId1472500442260tasmichelle',
	email: 'mailto:michelle@promotelocal.com',
  }].map(function (o) {
	return c.all([
	  c.linkTo({
		href: o.linkedIn,
		targetBlank: true,
	  }),
	])(c.overlays()([
	  c.image({
		src: o.src,
		minWidth: 300,
	  }),
	  c.all([
		c.margin(20),
		c.minWidth(300),
	  ])(c.alignTBM()({
		b: c.stack()([
		  c.text(o.name, [fonts.h2, {
			measureHeight: true,
		  }]),
		  c.text(o.position, [fonts.p, {
			measureHeight: true,
		  }]),
		]),
	  }))
	]));
  });
  var organizers = c.all([
	anchor('organizers'),
  ])(c.stack({
	padding: 20,
  })([
	c.text('Organizers', [fonts.h1, {
	  oneLine: true,
	  align: 'center',
	}]),
	c.grid({
	  surplusWidthFunc: hcj.funcs.surplusWidth.center,
	  useFullWidth: true,
	})([
	  c.grid({
		surplusWidthFunc: hcj.funcs.surplusWidth.center,
		useFullWidth: true,
	  })([
		organizerList[0],
		organizerList[1],
	  ]),
	  c.grid({
		surplusWidthFunc: hcj.funcs.surplusWidth.center,
		useFullWidth: true,
	  })([
		organizerList[2],
		organizerList[3],
	  ]),
	]),
  ]));
  var ideasSpeakersAndOrganizers = c.all([
	c.margin({
	  top: 100,
	  bottom: 100,
	  left: 50,
	  right: 50,
	}),
	c.backgroundColor({
	  background: colors.black,
	  font: colors.white,
	}),
  ])(c.stack()([
	ideasAndSpeakers,
	c.minHeight(100)(c.nothing),
	organizers,
  ]));
  var community = c.overlays()([
	c.all([
	  c.keepAspectRatio({
		fill: true,
	  }),
	  c.minHeight(0),
	  anchor('community'),
	])(c.image({
	  src: './images/community-1.png',
	})),
	c.all([
	  c.backgroundColor({
		font: colors.white,
	  }),
	  bodyColumn,
	  c.margin({
		top: 100,
		bottom: 100,
		left: 50,
		right: 50,
	  }),
	])(c.stack({
	  padding: 50,
	  surplusHeightFunc: hcj.funcs.surplusHeight.giveToNth(2),
	})([
	  c.text('Community', [fonts.h1, {
		oneLine: true,
		align: 'center',
	  }]),
	  c.grid({
		surplusWidthFunc: hcj.funcs.surplusWidth.giveToNth(0),
		padding: 50,
	  })([
		c.all([
		  c.minWidth(300),
		])(c.stack({
		  padding: 20,
		})([
		  c.text('About', [fonts.h2, {
			oneLine: true,
			weight: 'bold',
		  }]),
		  c.text('TEDx, x = independently organized event', [fonts.p, {
			measureHeight: true,
		  }]),
		  c.text('Madison has a tight knit community of educated and motivated individuals pushing our little big city forward. TEDx Madison is a yearly congregation creating a platform for the bright minds within the badger state. Our speakers and organizers are entrepreneurs, activists, and thought leaders within their respected industries.', [fonts.p, {
			measureHeight: true,
		  }]),
		  c.text('We invite you to join us Saturday October 29th at the Overture Center for a night of ideas worth spreading.', [fonts.p, {
			measureHeight: true,
		  }]),
		])),
		c.stack({
		  padding: 20,
		})([
		  c.text('How Can I Get Involved?', [fonts.h2, {
			measureWidth: true,
			measureHeight: true,
			weight: 'bold',
		  }]),
		  c.stack({
			padding: 20,
		  })([{
			fa: 'question-circle',
			text: 'Ask&nbsp;Us&nbsp;Questions',
		  }, {
			fa: 'hand-pointer-o',
			text: 'Suggest&nbsp;Speakers',
		  }, {
			fa: 'thumbs-up',
			text: 'Want&nbsp;to&nbsp;Sponsor?',
		  }].map(function (obj) {
			return c.all([
			  c.linkTo('mailto:team@tedxmadison.com'),
			])(c.sideBySide({
			  padding: 10,
			})([
			  c.text(fa(obj.fa), {
				measureWidth: true,
				oneLine: true,
			  }),
			  c.text(obj.text, [fonts.p, {
				measureWidth: true,
				oneLine: true,
				color: colors.red,
			  }]),
			]));
		  })),
		]),
	  ]),
	])),
  ]);

  var moveS = stream.once({
	amount: 0,
  });
  var sliderArrow = function (amount) {
	return c.all([
	  c.alignVMiddle,
	  c.link,
	  c.clickThis(function () {
		stream.push(moveS, {
		  amount: amount,
		});
	  }),
	]);
  };
  var partners = [{
	href: 'http://www.matrixcoworking.com/en',
	imageSrc: './slider-images/matrix-01.jpg',
  }, {
	href: 'https://www.promotelocal.com/',
	imageSrc: './slider-images/PL-01.jpg',
  }, {
	href: 'http://www.letsbackflip.com/',
	imageSrc: './slider-images/backflip_logo333.png',
  }, {
	href: 'http://undergroundshirts.com/',
	imageSrc: './slider-images/topugp2-2.png',
  }, {
	href: 'https://www.zendesk.com/',
	imageSrc: './slider-images/Zendesk_logo_RGB.png',
  }];
  var partnerIndexS = stream.reduce(moveS, function (x, move) {
	return ((x + move.amount) + partners.length) % partners.length;
  }, 0);

  var partnersFade = c.all([
	c.margin({
	  top: 100,
	  bottom: 100,
	}),
	bodyColumn,
	c.backgroundColor({
	  background: colors.white,
	  font: colors.black,
	}),
  ])(c.stack({
	padding: 50,
  })([
	c.text('Partners', [fonts.h1, {
	  align: 'center',
	  oneLine: true,
	}]),
	c.sideBySide({
	  surplusWidthFunc: hcj.funcs.surplusWidth.giveToNth(1),
	})([
	  sliderArrow(-1)(c.text('<', {
		size: 80,
		measureWidth: true,
		oneLine: true,
	  })),
	  c.all([
		c.minWidth(500),
		c.alignHMiddle,
		c.alignVMiddle,
	  ])(c.componentStream(stream.map(partnerIndexS, function (index) {
		var p = partners[index];
		return c.linkTo({
		  href: p.href,
		  targetBlank: true,
		})(c.image({
		  src: p.imageSrc,
		  minHeight: sliderHeight,
		}));
	  }), function (i) {
		i.$el.css('transition', 'opacity 1s')
		  .css('opacity', 0);
		var defer = $.Deferred();
		setTimeout(function () {
		  defer.resolve();
		}, 1000);
		return defer.promise();
	  })),
	  sliderArrow(1)(c.text('>', {
		size: 80,
		measureWidth: true,
		oneLine: true,
	  })),
	]),
  ]));

  var footer = c.all([
	bodyColumn,
	c.margin(20),
	c.backgroundColor({
	  background: colors.black,
	  font: colors.white,
	}),
  ])(c.alignLRM()({
	r: c.sideBySide({
	  padding: 20,
	})([{
	  fa: 'facebook',
	  href: 'http://www.facebook.com/tedxmadison',
	}, {
	  fa: 'twitter',
	  href: 'http://www.twitter.com/tedxmadison',
	}, {
	  fa: 'envelope',
	  href: 'mailto:team@tedxmadison.com',
	}].map(function (obj) {
	  return c.all([
		c.linkTo(obj.href),
	  ])(c.text(fa(obj.fa), [{
		measureWidth: true,
		oneLine: true,
	  }]));
	})),
  }));
  var page = c.all([
	c.$addClass('root-page'),
  ])(c.stack()([
	c.all([
	  c.minHeightAtLeast(hcj.viewport.heightS),
	])(c.stack({
	  surplusHeightFunc: hcj.funcs.surplusHeight.giveToNth(1),
	})([
	  header,
	  topView,
	])),
	lilQuote,
	ideasSpeakersAndOrganizers,
	community,
	partnersFade,
	// footer,
  ]));

  new FontLoader([
	'Lato',
	'Raleway',
  ], {
	complete: function () {
	  waitForWebfonts([
		'FontAwesome',
	  ], function () {
		hcj.rootComponent(page);
	  });
	},
  }, 10000).loadFonts();
});
