import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import LevelContent from '../pupil/LevelContent';
import { sortModules } from '../../utils/sortLevelsAndModules';
import CustomSuspense from '../data-fetching/CustomSuspense';
import getRainbowLabel from '../../utils/getRainbowLabel';
import ScoreDisplay from '../../components/subjects/ScoreDisplay';
import { HexagonsTabs, HexagonsTab } from '../HexagonsTabs';
import getLevelLabel from '../../utils/getLevelLabel';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function StagesTabs({ isRa, modules, startingLevel, pupil, latestTarget, currentScore, ...other }) {
  const { initialScore, targetScore, scorePublishedAt, isScoreLoading } = latestTarget;
  const [currentScoreForTargetPanel, setCurrentScoreForTargetPanel] = useState(currentScore);

  useEffect(() => {
    console.log('CURRENT SCORE', currentScore);
  }, [currentScore]);

  const [tabValue, setTabValue] = useState(0);
  const [sortedModules, setSortedModules] = useState(modules);

  const levelWasQuickAssessed = startingLevel ? startingLevel.wasQuickAssessed : false;
  const startingLevelId = startingLevel ? parseInt(startingLevel.id) : 0;
  const [levelId, setLevelId] = useState(startingLevelId);

  useEffect(() => {
    // ensure levelId resets
    if (!startingLevel) {
      setLevelId(0);
    }
  }, [startingLevel, pupil, setLevelId]);

  useEffect(() => {
    if (modules) {
      const sortedModules = sortModules(modules);
      setSortedModules(sortedModules);
    }
  }, [modules]);

  useEffect(() => {
    if (modules && startingLevel && startingLevel.module) {
      const activeModule = modules.map(
        (module, i) =>
          module.order === startingLevel.module.order && module.level === startingLevel.module.level
      );
      const startingIndex = activeModule.indexOf(true) > -1 ? activeModule.indexOf(true) : 0;
      setTabValue(startingIndex);
    } else {
      setTabValue(0);
    }
  }, [modules, startingLevel, pupil]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    setLevelId(0); // We don't know what the level will be but we don't want it using the old level
  };

  const getLabel = (module, i) => {
    const standardLabel = `${getLevelLabel(module.level)} ${module.order}`;
    return isRa ? getRainbowLabel(i) : standardLabel;
  };

  return (
    <>
      {' '}
      <Box mb={3}>
        <ScoreDisplay
          initialScore={initialScore}
          targetScore={targetScore}
          currentScore={currentScoreForTargetPanel}
          scorePublishedAt={scorePublishedAt}
          isScoreLoading={isScoreLoading}
        />
      </Box>
      <CustomSuspense message="Loading tabs">
        <HexagonsTabs
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {sortedModules.map((module, i) => {
            const label = getLabel(module, i);
            return (
              <HexagonsTab
                data-test-id={`tab-${i}`}
                key={`link-${i}`}
                label={label}
                {...a11yProps(i)}
              />
            );
          })}
        </HexagonsTabs>
      </CustomSuspense>
      {sortedModules.map((currentModule, i) => {
        const levelTitle = getLabel(currentModule, i);
        return (
          <TabPanel key={`panel-${i}`} value={tabValue} index={i}>
            <CustomSuspense message={`Loading ${currentModule.order}`}>
              <LevelContent
                levelTitle={levelTitle}
                levelWasQuickAssessed={levelWasQuickAssessed}
                pupil={pupil}
                levelId={levelId}
                setLevelId={setLevelId}
                currentModule={currentModule}
                competenciesVars={{ pupilId: parseInt(pupil.id), levelId: levelId ? levelId : 0 }}
                setCurrentScoreForTargetPanel={setCurrentScoreForTargetPanel}
                {...other}
              />
            </CustomSuspense>
          </TabPanel>
        );
      })}
    </>
  );
}

StagesTabs.propTypes = {
  isRa: PropTypes.bool,
  modules: PropTypes.array,
  startingLevel: PropTypes.object,
  pupil: PropTypes.object,
  latestTarget: PropTypes.object,
  currentScore: PropTypes.object,
};

export default StagesTabs;
