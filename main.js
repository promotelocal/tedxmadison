$(function () {
  var sliderTransition = 1;
  var sliderHeight = 400;
  var colors = {
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
	  size: px(33),
	  lineHeight: 1.8,
	},
	h2: {
	  family: 'Lato',
	  size: px(24),
	},
	p: {
	  family: 'Lato',
	},
  };
  var bodyColumn = function (c) {
	return alignLRM()({
	  m: all([
		withMinWidth(1000),
	  ])(c),
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
  var headerBar = all([
	bodyColumn,
	margin({
	  all: 20,
	}),
	withBackgroundColor(color({
	  a: 1,
	}), white),
  ])(alignLRM()({
	r: largestWidthThatFits()([
	  sideBySide({
		padding: 20,
	  })(headerLinks.map(function (l) {
		return all([
		  linkTo(l.href),
		])(text(l.name, [fonts.p, {
		  lineHeight: 1,
		  measureWidth: true,
		  oneLine: true,
		}]));
	  })),
	  all([
		keepAspectRatio(),
		alignRight,
		link,
		clickThis(function (ev) {
		  ev.stopPropagation();
		  stream.push(menuOpenS, !menuOpenS.lastValue);
		}),
		$$(function () {
		  $('body').on('click', function () {
			stream.push(menuOpenS, false);
		  });
		}),
	  ])(image({
		src: './images/menu.png',
		minHeight: 16,
	  })),
	]),
  }));
  var dropdownOptions = stack()(headerLinks.map(function (l) {
	return all([
	  margin(20),
	  withBackgroundColor(color({
		a: 0.7,
	  }), white),
	  linkTo(l.href),
	])(text(l.name, [fonts.p, {
	  measureWidth: true,
	  oneLine: true,
	}]));
  }));
  var headerHeightS = stream.once(0);
  var header = all([
	$$(function ($el) {
	  setTimeout(function () {
		$el.css('position', 'fixed')
		  .css('z-index', 1);
	  });
	}),
	and(function (i, ctx) {
	  stream.pushAll(ctx.height, headerHeightS);
	}),
  ])(dropdownPanel(headerBar, dropdownOptions, menuOpenS));
  var anchor = function (id) {
	return $$(function ($el) {
	  var $anchor = $(document.createElement('a'))
			.css('position', 'absolute')
			.prop('id', id)
			.appendTo($el);
	  stream.onValue(headerHeightS, function (h) {
		$anchor.css('top', -h);
	  });
	});
  };
  var topView = all([
	keepAspectRatio({
	  fill: true,
	  left: true,
	}),
  ])(image({
	src: './images/TedX-Banner2.png',
  }));
  var lilQuote = all([
	bodyColumn,
	margin(20),
  ])(grid({
	handleSurplusWidth: giveToNth(0),
	padding: 20,
  })([
	alignTBM()({
	  m: text('We\'re paving the road to TEDx Madison 2016. Organizers are assembling the community, speakers, and sponsors. How can you help?', [fonts.p, {
		measureHeight: true,
		color: colors.gray,
		size: px(20),
		minWidth: 350,
	  }]),
	}),
	all([
	  margin({
		top: 15,
		bottom: 15,
		left: 25,
		right: 25,
	  }),
	  withBackgroundColor(colors.red, white),
	  linkTo('#community'),
	  alignTop,
	  alignLeft,
	])(text('Click&nbsp;Here', [fonts.p, {
	  measureWidth: true,
	  oneLine: true,
	}])),
  ]));
  var speakers = [{
	name: 'Jenine Gao',
	thumbSrc: './images/speakers/thumbnail_Jenine Gao - Grid-01.jpg',
	expandedSrc: './images/speakers/Jenine Gao - Expanded-01.jpg',
	bio: [
	  "Jenie Gao is an artist, writer, and disgustingly organized project manager. She sees her work as a teaching tool, a way to challenge conventional wisdom and invite others to do the same. Her artistic roots lie in the history of printmaking. She is known for her bold woodcuts, ink work, and allegorical storytelling style that address our universal&mdash;yet often isolating and divisive&mdash;human dilemmas.",
	  "Having worked across industries, from education to nonprofit to lean manufacturing, Jenie is passionate about cross-disciplinary work. She believes that fair access to creative education is fundamental to human prosperity and is a big proponent of the emerging maker movement, in using creativity and logic to foster our connection to how and why we make things.",
	  "Jenie continues to work collaboratively across the worlds of fine arts, business, and nonprofit. She advocates for the role of the arts in the building stronger, smarter, kinder communities.",
	],
  }, {
	name: 'Matt Gonnering',
	thumbSrc: './images/speakers/thumbnail_Matt Gonnering - Grid-01.jpg',
	expandedSrc: './images/speakers/thumbnail_Matthew Gonnering - Expanded-01.jpg',
	bio: [
	  "Matthew Gonnering is the CEO of Widen, a marketing technology company founded in 1948. Blessed to work with highly intelligent, playful, self-starting Wideneers, Matthew has reshaped his role into &ldquo;Chief Eudaimonia Officer.&rdquo; His mission is to create happiness, health and prosperity for his colleagues, customers and community.",
	  "Matthew joined Widen in 2000 and became CEO in 2009. His team solves marketing and creative problems with digital asset management (DAM) software. Under Matthew's leadership, Widen has become a WorldBlu Freedom-Centered Workplace™ and a Madison Magazine Best Place to Work.  His ongoing commitment to faith, family, education, and nonprofit work shape his desire to ground organizational culture in humanity.",
	  "Matthew and his beautiful wife Sarah have five energetic children and reside in the Madison area.  He lives a eudaimonious life and encourages others to do the same.",
	],
  }, {
	name: 'Kelly Senecal',
	thumbSrc: './images/speakers/Kelly Senecal-Grid-01.jpg',
	expandedSrc: './images/speakers/Kelly Senecal - Expanded-01.jpg',
	bio: [
	  "Kelly Senecal is a co-founder and owner of Convergent Science, Inc. with headquarters in Madison, Wisconsin, and Convergent Science, GmbH with headquarters in Linz, Austria. Dr. Senecal is one of the original developers of the CONVERGE computational fluid dynamics software package. He is a consultant to the automotive industry and works closely with engineers on problems related to combustion modeling and other fluid flow phenomena. He is experienced at managing large consulting and software development projects for the private sector.",
	  "Dr. Senecal received his PhD from the University of Wisconsin-Madison.  He has written a number of research papers in the area of Computational Fluid Dynamics (CFD) of reactive flows. He has received international recognition for his pioneering work on the use of CFD in the engine design process, including articles in The New York Times and England\'s The Sunday Times. He is also the author of the widely used LISA (Linearized Instability Sheet Atomization) spray breakup model",
	],
  }];
  var speakerDialog = function (speaker) {
	var instance = rootComponent(all([
	  link,
	  clickThis(function () {
		instance.destroy();
	  }),
	  $$(function ($el) {
		$el.css('background-color', 'black')
		  .css('color', 'white')
		  .css('opacity', '0')
		  .css('pointer-events', 'initial')
		  .css('z-index', 10000);
		setTimeout(function () {
		  $el.css('opacity', '1')
			.css('position', 'fixed')
			.css('transition', 'opacity 0.2s');
		});
	  }),
	  // margin(20),
	  minHeightAtLeast(windowHeight),
	])(alignTBM()({
	  m: stack({
		padding: 20,
	  })([
		grid({
		  handleSurplusWidth: evenSplitSurplusWidth,
		})([
		  all([
			keepAspectRatio({
			  fill: true,
			}),
		  ])(image({
			src: speaker.expandedSrc,
			minWidth: 300,
		  })),
		  stack()([
			text(speaker.name, [fonts.h1, {
			  measureWidth: true,
			  measureHeight: true,
			  align: 'center',
			}]),
			all([
			  margin(20),
			])(stack({
			  padding: 10,
			})(speaker.bio.map(function (paragraph) {
			  return text(paragraph, [fonts.p, {
				measureHeight: true,
			  }]);
			}))),
		  ]),
		]),
	  ]),
	})), {
	  noBackground: true,
	});
  };

  var ideasAndSpeakers = all([
	bodyColumn,
	margin(50),
	withBackgroundColor(black, white),
	anchor('ideas-speakers'),
  ])(stack({
	padding: 20,
  })([
	text('Ideas & Speakers', [fonts.h1, {
	  measureHeight: true,
	  align: 'center',
	}]),
	grid({
	  handleSurplusWidth: centerSurplusWidth,
	})(speakers.map(function (s) {
	  return all([
		withMinWidth(300),
		link,
		clickThis(function () {
		  speakerDialog(s);
		}),
	  ])(image({
		src: s.thumbSrc,
	  }));
	})),
	all([
	  linkTo('mailto:team@tedxmadison.com'),
	])(text('Suggest Speakers', [fonts.h2, {
	  color: colors.red,
	  oneLine: true,
	  align: 'center',
	}])),
  ]));
  var faBackground = all([
	margin(10),
	border(transparent, {
	  all: 1,
	  radius: 3,
	}),
	hoverColor({
	  backgroundColor: transparent,
	  fontColor: colors.lighterGray,
	  hoverBackgroundColor: white,
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
	src: './images/james-1.png',
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
	src: './images/michelle-1.png',
	linkedIn: 'https://www.linkedin.com/in/roachmichelle?authType=NAME_SEARCH&authToken=9wBS&locale=en_US&trk=tyah&trkInfo=clickedVerticalmynetworkclickedEntityId109535263authTypeNAME_SEARCHidx1-1-1tarId1472500442260tasmichelle',
	email: 'mailto:michelle@promotelocal.com',
  }].map(function (o) {
	return stack({
	  padding: 10,
	})([
	  image({
		src: o.src,
	  }),
	  text(o.name, [fonts.p, {
		oneLine: true,
		align: 'center',
		size: 18,
	  }]),
	  text(o.position, [fonts.p, {
		oneLine: true,
		align: 'center',
	  }]),
	  alignLRM()({
		m: sideBySide({
		  padding: 20,
		})([
		  all([
			faBackground,
			linkTo(o.linkedIn, true),
		  ])(text(fa('linkedin'), {
			measureWidth: true,
			oneLine: true,
		  })),
		  all([
			faBackground,
			linkTo(o.email),
		  ])(text(fa('envelope'), {
			measureWidth: true,
			oneLine: true,
		  })),
		]),
	  }),
	]);
  });
  var organizers = all([
	margin(50),
	withBackgroundColor(black, white),
	anchor('organizers'),
  ])(stack({
	padding: 20,
  })([
	text('Organizers', [fonts.h1, {
	  oneLine: true,
	  align: 'center',
	}]),
	grid({
	  padding: 20,
	  handleSurplusWidth: centerSurplusWidth,
	  useFullWidth: true,
	})([
	  grid({
		padding: 20,
		handleSurplusWidth: centerSurplusWidth,
		useFullWidth: true,
	  })([
		organizerList[0],
		organizerList[1],
	  ]),
	  grid({
		padding: 20,
		handleSurplusWidth: centerSurplusWidth,
		useFullWidth: true,
	  })([
		organizerList[2],
		organizerList[3],
	  ]),
	]),
  ]));
  var community = overlays()([
	all([
	  keepAspectRatio({
		fill: true,
	  }),
	  withMinHeight(0),
	  anchor('community'),
	])(image({
	  src: './images/community-1.png',
	})),
	all([
	  withFontColor(white),
	  bodyColumn,
	  margin(50),
	])(stack({
	  padding: 50,
	  handleSurplusHeight: giveHeightToNth(2),
	})([
	  text('Community', [fonts.h1, {
		oneLine: true,
		align: 'center',
	  }]),
	  grid({
		handleSurplusWidth: giveToNth(0),
		padding: 50,
	  })([
		all([
		  withMinWidth(300),
		])(stack({
		  padding: 20,
		})([
		  text('About', [fonts.h2, {
			oneLine: true,
			weight: 'bold',
		  }]),
		  text('TEDx, x = independently organized event', [fonts.p, {
			measureHeight: true,
		  }]),
		  text('Madison has a tight knit community of educated and motivated individuals pushing our little big city forward. TEDx Madison is a yearly congregation creating a platform for the bright minds within the badger state. Our speakers and organizers are entrepreneurs, activists, and thought leaders within their respected industries.', [fonts.p, {
			measureHeight: true,
		  }]),
		  text('We invite you to join us Saturday October 29th at the Overture Center for a night of ideas worth spreading.', [fonts.p, {
			measureHeight: true,
		  }]),
		])),
		stack({
		  padding: 20,
		})([
		  text('How Can I Get Involved?', [fonts.h2, {
			measureWidth: true,
			measureHeight: true,
			weight: 'bold',
		  }]),
		  stack({
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
			return all([
			  linkTo('mailto:team@tedxmadison.com'),
			])(sideBySide({
			  padding: 10,
			})([
			  text(fa(obj.fa), {
				measureWidth: true,
				oneLine: true,
			  }),
			  text(obj.text, [fonts.p, {
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
	return all([
	  alignAbsoluteCenter,
	  withBackgroundColor(color({
		a: 0.7,
	  }), white),
	  link,
	  clickThis(function () {
		stream.push(moveS, {
		  amount: amount,
		});
	  }),
	]);
  };
  var partners = all([
	margin({
	  top: 50,
	  bottom: 50,
	}),
	bodyColumn,
	withBackgroundColor(black, white),
  ])(stack({
	padding: 50,
  })([
	text('Partners', [fonts.h1, {
	  align: 'center',
	  oneLine: true,
	}]),
	sideBySide({
	  handleSurplusWidth: giveToNth(1),
	})([
	  sliderArrow(-1)(text('<', {
		size: 80,
		measureWidth: true,
		oneLine: true,
	  })),
	  all([
		withMinWidth(500),
		alignAbsoluteCenter,
	  ])(slideshow({
		transitionTime: sliderTransition,
		moveS: moveS,
		alwaysFullWidth: true,
	  })([
		linkTo('http://www.matrixcoworking.com/en', true)(image({
		  src: './slider-images/matrix-01.jpg',
		  minHeight: sliderHeight,
		})),
		linkTo('https://www.app.promotelocal.com/', true)(image({
		  src: './slider-images/PL-01.jpg',
		  minHeight: sliderHeight,
		})),
		linkTo('http://www.letsbackflip.com/', true)(image({
		  src: './slider-images/backflip_logo333.png',
		  minHeight: sliderHeight,
		})),
		linkTo('http://undergroundshirts.com/', true)(image({
		  src: './slider-images/topugp2-2.png',
		  minHeight: sliderHeight,
		})),
		linkTo('https://www.zendesk.com/', true)(image({
		  src: './slider-images/Zendesk_logo_RGB.png',
		  minHeight: sliderHeight,
		})),
	  ])),
	  sliderArrow(1)(text('>', {
		size: 80,
		measureWidth: true,
		oneLine: true,
	  })),
	]),
  ]));

  var footer = all([
	bodyColumn,
	margin(20),
	withBackgroundColor(black, white),
  ])(alignLRM()({
	r: sideBySide({
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
	  return all([
		linkTo(obj.href),
	  ])(text(fa(obj.fa), [{
		measureWidth: true,
		oneLine: true,
	  }]));
	})),
  }));
  var page = stack()([
	all([
	  minHeightAtLeast(windowHeight),
	])(stack({
	  handleSurplusHeight: giveHeightToNth(1),
	})([
	  header,
	  topView,
	])),
	lilQuote,
	ideasAndSpeakers,
	organizers,
	community,
	partners,
	footer,
  ]);

  new FontLoader([
	'Lato',
  ], {
	complete: function () {
	  waitForWebfonts([
		'FontAwesome',
	  ], function () {
		rootComponent(page);
	  });
	},
  }, 10000).loadFonts();
});
