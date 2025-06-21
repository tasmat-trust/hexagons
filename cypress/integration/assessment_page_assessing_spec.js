import getSubjects from '../fixtures/getSubjects.json';
import getPupil from '../fixtures/getPupil.json';
import getSingleGroup from '../fixtures/getSingleGroup.json';
import getAllPupilsByGroup from '../fixtures/getAllPupilsByGroup.json';
import getAllLevelsEmpty from '../fixtures/getAllLevelsEmpty.json';

const firstCompText = 'sfdsdf';
const firstCompId = 1617;
const secondCompId = 1618;
const thirdCompId = 1619;
const summaryText = 'sdf';

context('Assessment page', () => {
  beforeEach(() => {
    cy.login('Teacher');

    let getSingleSubjectBySlug = {
      body: {
        data: {
          subjects: {
            data: [
              {
                id: '68',
                attributes: {
                  name: 'Expressive Language',
                  slug: 'expressive-language',
                  excludeEarlyDevelopmentStep: true,
                  isRainbowAwards: false,
                  organization: {
                    data: null,
                  },
                },
              },
            ],
          },
        },
      },
    };

    let getModules = {
      body: {
        data: {
          modules: {
            data: [
              {
                id: '123',
                attributes: {
                  order: 2,
                  level: 'step',
                  summary: summaryText,
                  guidance: null,
                  capabilities: {
                    data: [
                      {
                        id: `${firstCompId}`,
                        attributes: { text: firstCompText, guidance: { data: [] } },
                      },
                      {
                        id: `${secondCompId}`,
                        attributes: { text: 'sfdsdf', guidance: { data: [] } },
                      },
                      {
                        id: `${thirdCompId}`,
                        attributes: { text: 'sdfsfd', guidance: { data: [] } },
                      },
                      { id: '4', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '5', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '6', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '7', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '8', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '9', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '410', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                    ],
                  },
                },
              },
              {
                id: '4',
                attributes: {
                  order: 3,
                  level: 'step',
                  summary: summaryText,
                  guidance: null,
                  capabilities: {
                    data: [
                      { id: '1', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '2', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '3', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '4', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '5', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '6', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '7', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '8', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '9', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '10', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '11', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                      { id: '12', attributes: { text: 'sdfsfd', guidance: { data: [] } } },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
    };

    cy.mockGraphQL([
      { query: 'getSingleSubjectBySlug', data: getSingleSubjectBySlug },
      { query: 'getSingleGroup', data: getSingleGroup },
      { query: 'getPupil', data: getPupil },
      { query: 'getSubjects', data: getSubjects },
      { query: 'getAllPupilsByGroup', data: getAllPupilsByGroup },
      { query: 'getAllLevels', data: getAllLevelsEmpty },
      { query: 'getModules', data: getModules },
    ]);
  });

  describe('Page with no competencies marked', () => {
    let getLevelEmpty = {
      body: {
        data: {
          levels: {
            data: [],
          },
          targets: {
            data: [],
          },
        },
      },
    };

    let getCompetenciesEmpty = {
      body: {
        data: {
          competencies: {
            data: [],
          },
        },
      },
    };

    let createLevel = {
      data: {
        createLevel: {
          data: {
            id: '614',
            attributes: {
              status: 'incomplete',
              wasQuickAssessed: false,
            },
          },
        },
      },
    };

    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getLevel', data: getLevelEmpty },
        { query: 'getCompetencies', data: getCompetenciesEmpty },
        { query: 'createLevel', data: createLevel },
      ]);
      cy.visit('/subjects/expressive-language/class-1/154');
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
    });

    it('lets teacher mark a competency as complete', () => {
      cy.get('[data-test-id=hex-1]').click();

      cy.wait('@gqlcreateLevelQuery').its('request.url').should('include', '/graphql');

      cy.get('[data-test-id=level-status-status]').should('not.exist');
      cy.get('[data-test-id=percent-complete-label]').contains('0');
    });
  });

  describe('Page with one competency marked', () => {
    let getLevel = {
      data: {
        levels: {
          data: [
            {
              id: '615',
              attributes: {
                status: 'emerging',
                wasQuickAssessed: false,
                competencies: {
                  data: [
                    {
                      id: '2863',
                      attributes: {
                        status: 'complete',
                        capability_fk: firstCompId,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        targets: {
          data: [],
        },
      },
    };

    let getCompetencies = {
      data: {
        competencies: {
          data: [
            {
              id: '2863',
              attributes: {
                status: 'complete',
                capability_fk: firstCompId,
              },
            },
          ],
        },
      },
    };

    let getCompetency = {
      data: {
        competencies: {
          data: [
            {
              id: '2863',
              attributes: {
                status: 'complete',
                capability_fk: firstCompId,
              },
            },
          ],
        },
      },
    };

    let updateCompetency = {
      data: {
        updateCompetency: {
          data: {
            id: '2863',
          },
        },
      },
    };

    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getLevel', data: getLevel },
        { query: 'getCompetencies', data: getCompetencies },
        { query: 'getCompetency', data: getCompetency },
        { query: 'updateCompetency', data: updateCompetency },
      ]);
      cy.visit('/subjects/expressive-language/class-1/154');
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
    });

    it('displays 10% complete and "emerging", lets teacher mark a competency as target, includes accessible SVG icon in hexagon', () => {
      cy.get('[data-test-id=hex-1] svg').should('contain', 'Is complete');
      cy.get('[data-test-id=level-status-status]').should('contain', 'emerging');
      cy.get('[data-test-id=percent-complete-label]').should('contain', '10');
      cy.get('[data-test-id=hex-1]').click();
      cy.wait('@gqlgetCompetencyQuery').its('request.url').should('include', '/graphql');
    });
  });

  describe('Page quick assessed as secure with no competencies marked', () => {
    let getLevel = {
      data: {
        levels: {
          data: [
            {
              id: '615',
              attributes: {
                status: 'secure',
                wasQuickAssessed: true,
              },
            },
          ],
        },
        targets: {
          data: [
            {
              id: '329',
              attributes: {
                initial_score: 4.2,
                target_score: 4.6,
                publishedAt: '2025-03-14T17:50:03.912Z',
                pupilSubjectScore: {
                  data: {
                    id: '261',
                    attributes: {
                      current_score: 4.2,
                    },
                  },
                },
              },
            },
          ],
        },
      },
    };

    let getCompetencies = {
      data: {
        competencies: {
          data: [],
        },
      },
    };

    let updateLevel = {
      data: {
        updateLevel: {
          data: {
            id: '615',
            attributes: {
              status: 'complete',
              wasQuickAssessed: true,
            },
          },
        },
      },
    };

    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getLevel', data: getLevel },
        { query: 'getCompetencies', data: getCompetencies },
        { query: 'updateLevel', data: updateLevel },
      ]);
      cy.visit('/subjects/expressive-language/class-1/154');
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
    });

    it('displays 75% secure and allows quick assessing to 100% complete', () => {
      cy.get('[data-test-id=level-status-status]').should('contain', 'secure');
      cy.get('[data-test-id=percent-complete-label]').should('contain', '75');
      cy.get('[data-test-id="quick-assess"]').click();
      cy.get('[data-test-id="mark-complete"]').should('exist');
      cy.get('[data-test-id="mark-complete"]').click();
      cy.wait('@gqlupdateLevelQuery').its('request.url').should('include', '/graphql');
      cy.get('[data-test-id=level-status-status]').contains('complete');
      cy.get('[data-test-id=percent-complete-label]').contains('100');
    });
  });

  describe('Page quick assessed as secure with competencies marked', () => {
    let getLevel = {
      data: {
        levels: {
          data: [
            {
              id: '615',
              attributes: {
                status: 'secure',
                wasQuickAssessed: true,
                competencies: {
                  data: [
                    {
                      id: '2863',
                      attributes: {
                        status: 'complete',
                        capability_fk: firstCompId,
                      },
                    },
                    {
                      id: '2864',
                      attributes: {
                        status: 'target',
                        capability_fk: secondCompId,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        targets: {
          data: [
            {
              id: '329',
              attributes: {
                initial_score: 4.2,
                target_score: 4.6,
                publishedAt: '2025-03-14T17:50:03.912Z',
                pupilSubjectScore: {
                  data: {
                    id: '261',
                    attributes: {
                      current_score: 4.2,
                    },
                  },
                },
              },
            },
          ],
        },
      },
    };

    let getCompetencies = {
      data: {
        competencies: {
          data: [
            {
              id: '2863',
              attributes: {
                status: 'complete',
                capability_fk: firstCompId,
              },
            },
            {
              id: '2864',
              attributes: {
                status: 'target',
                capability_fk: secondCompId,
              },
            },
          ],
        },
      },
    };

    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getLevel', data: getLevel },
        { query: 'getCompetencies', data: getCompetencies },
      ]);
      cy.visit('/subjects/expressive-language/class-1/154');
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
    });

    it('displays as secure 75%, and after clicking away and coming back', () => {
      cy.get('[data-test-id=level-status-status]').should('contain', 'secure');
      cy.get('[data-test-id=percent-complete-label]').should('contain', '75');
      cy.get('[data-test-id=tab-1]').click();
      cy.get('[data-test-id=hex-11]').should('exist');
      cy.get('[data-test-id=tab-0]').click();
      cy.get('[data-test-id=level-status-status]').should('contain', 'secure');
      cy.get('[data-test-id=percent-complete-label]').should('contain', '75');
    });
  });

  // describe('Page with all competencies marked complete', () => {
  //   let getLevel = {
  //     data: {
  //       levels: {
  //         data: [
  //           {
  //             id: '615',
  //             attributes: {
  //               status: 'complete',
  //               wasQuickAssessed: false,
  //               competencies: {
  //                 data: [
  //                   {
  //                     id: '2863',
  //                     attributes: {
  //                       status: 'complete',
  //                       capability_fk: firstCompId,
  //                     },
  //                   },
  //                   {
  //                     id: '2864',
  //                     attributes: {
  //                       status: 'complete',
  //                       capability_fk: secondCompId,
  //                     },
  //                   },
  //                   {
  //                     id: '2865',
  //                     attributes: {
  //                       status: 'complete',
  //                       capability_fk: thirdCompId,
  //                     },
  //                   },
  //                 ],
  //               },
  //             },
  //           },
  //         ],
  //       },
  //       targets: {
  //         data: [],
  //       },
  //     },
  //   };

  //   let getCompetencies = {
  //     data: {
  //       competencies: {
  //         data: [
  //           {
  //             id: '2863',
  //             attributes: {
  //               status: 'complete',
  //               capability_fk: firstCompId,
  //             },
  //           },
  //           {
  //             id: '2864',
  //             attributes: {
  //               status: 'complete',
  //               capability_fk: secondCompId,
  //             },
  //           },
  //           {
  //             id: '2865',
  //             attributes: {
  //               status: 'complete',
  //               capability_fk: thirdCompId,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   };

  //   beforeEach(() => {
  //     cy.mockGraphQL([
  //       { query: 'getLevel', data: getLevel },
  //       { query: 'getCompetencies', data: getCompetencies },
  //     ]);
  //     cy.visit('/subjects/expressive-language/class-1/154');
  //     cy.waitForSpinners();
  //     cy.waitForSpinners();
  //     cy.waitForSpinners();
  //   });

  //   it('displays 100% complete and status', () => {
  //     cy.get('[data-test-id=level-status-status]').should('be.visible');
  //     cy.get('[data-test-id=level-status-status]').invoke('text').then((text) => {
  //       cy.log('Status text:', text);
  //     });
  //     cy.get('[data-test-id=level-status-status]').contains('complete');
  //     cy.get('[data-test-id=percent-complete-label]').contains('100');
  //   });

  //   it('asks the user to untick competencies if they attempt to mark as incomplete a genuinely completed level', () => {
  //     cy.get('[data-test-id=level-status-status]').contains('complete');
  //     cy.get('[data-test-id="mark-incomplete"]').click();
  //     cy.get('[data-test-id="level-status-alert"]').should('exist');
  //   });
  // });
});
