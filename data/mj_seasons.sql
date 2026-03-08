-- ============================================
-- Michael Jordan Chicago Bulls Seasons (SQL)
-- Matching CSV structure, no starter_stats
-- ============================================

DROP TABLE IF EXISTS mj_seasons;

CREATE TABLE mj_seasons (
    season TEXT,
    team TEXT,
    gp INTEGER,
    mpg REAL,
    ppg REAL,
    rpg REAL,
    apg REAL,
    fg_pct REAL,
    fg3_pct REAL,
    ft_pct REAL,
    team_record TEXT,
    playoff_result TEXT,
    starters TEXT,
    coach TEXT,
    team_srs REAL,
    team_off_rtg REAL,
    team_def_rtg REAL,
    mj_per REAL,
    mj_ws REAL,
    mj_bpm REAL,
    awards TEXT
);

INSERT INTO mj_seasons VALUES
('1984-85','CHI',82,38.3,28.2,6.5,5.9,0.515,0.173,0.845,'38-44','Lost First Round to Bucks 1-3','Whatley|Jordan|Woolridge|Green|Corzine','Kevin Loughery',-0.9,107.5,109.0,25.8,14.0,7.5,'ROY;All-Star;All-NBA 2nd'),

('1985-86','CHI',18,25.1,22.7,3.6,2.9,0.457,0.167,0.840,'30-52','Lost First Round to Celtics 0-3','Macy|Jordan|Woolridge|Oakley|Oldham','Stan Albeck',-2.7,105.0,108.5,27.8,3.7,9.0,'All-Star'),

('1986-87','CHI',82,40.0,37.1,5.2,4.6,0.482,0.182,0.857,'40-42','Lost First Round to Celtics 0-3','Paxson|Jordan|Sellers|Oakley|Corzine','Doug Collins',-0.3,109.5,109.8,29.8,14.0,11.8,'Scoring Champ;All-NBA 1st'),

('1987-88','CHI',82,40.4,35.0,5.5,5.9,0.535,0.132,0.841,'50-32','Lost Second Round to Pistons 1-4','Vincent|Jordan|Pippen|Grant|Corzine','Doug Collins',3.7,111.0,106.5,31.7,18.3,13.0,'MVP;DPOY;Scoring Champ;All-NBA 1st'),

('1988-89','CHI',81,40.2,32.5,8.0,8.0,0.538,0.276,0.850,'47-35','Lost Conference Finals to Pistons 2-4','Vincent/Hodges|Jordan|Pippen|Grant|Cartwright','Doug Collins',3.0,110.5,107.0,31.1,19.8,11.8,'Scoring Champ;All-NBA 1st'),

('1989-90','CHI',82,39.0,33.6,6.9,6.3,0.526,0.376,0.848,'55-27','Lost Conference Finals to Pistons 3-4','Paxton|Jordan|Pippen|Grant|Cartwright','Phil Jackson',5.5,112.0,106.5,31.6,20.2,11.4,'Scoring Champ;All-NBA 1st'),

('1990-91','CHI',82,37.0,31.5,6.0,5.5,0.539,0.312,0.851,'61-21','NBA Champions vs Lakers 4-1','Paxton|Jordan|Pippen|Grant|Cartwright','Phil Jackson',8.6,114.6,105.2,31.6,20.3,11.9,'MVP;FMVP;Scoring Champ;All-NBA 1st'),

('1991-92','CHI',80,38.8,30.1,6.4,6.1,0.519,0.270,0.832,'67-15','NBA Champions vs Blazers 4-2','Paxton|Jordan|Pippen|Grant|Cartwright','Phil Jackson',10.4,115.5,104.5,27.0,18.0,9.3,'MVP;FMVP;Scoring Champ;All-NBA 1st'),

('1992-93','CHI',78,39.3,32.6,6.7,5.5,0.495,0.352,0.837,'57-25','NBA Champions vs Suns 4-2','Armstrong|Jordan|Pippen|Grant|Cartwright/King','Phil Jackson',6.3,113.0,106.0,29.7,17.2,9.2,'FMVP;Scoring Champ;All-NBA 1st'),

('1994-95','CHI',17,39.3,26.9,6.9,5.3,0.411,0.500,0.801,'47-35','Lost Second Round to Magic 2-4','Armstrong|Jordan|Pippen|Kukoc|Perdue/Longley','Phil Jackson',2.3,110.0,107.5,22.9,3.2,6.0,''),

('1995-96','CHI',82,37.7,30.4,6.6,4.3,0.495,0.427,0.834,'72-10','NBA Champions vs Sonics 4-2','Harper|Jordan|Pippen|Rodman|Longley','Phil Jackson',11.8,115.2,101.8,29.4,20.4,9.4,'MVP;FMVP;Scoring Champ;All-NBA 1st'),

('1996-97','CHI',82,37.9,29.6,5.9,4.3,0.486,0.374,0.833,'69-13','NBA Champions vs Jazz 4-2','Harper|Jordan|Pippen|Rodman|Longley','Phil Jackson',10.7,113.5,102.4,27.8,18.3,8.3,'FMVP;Scoring Champ;All-NBA 1st'),

('1997-98','CHI',82,38.8,28.7,5.8,3.5,0.465,0.238,0.784,'62-20','NBA Champions vs Jazz 4-2','Harper|Jordan|Pippen|Rodman|Longley','Phil Jackson',7.2,110.0,103.2,25.8,15.8,7.4,'FMVP;Scoring Champ;All-NBA 1st');
