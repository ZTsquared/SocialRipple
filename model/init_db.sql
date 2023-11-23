-- My database comes with a lot of inserts to add everything and have the app working when you do npm run migrate.
-- I hate to have sooooo many INSERT INTO lines, but I guess after I try Sequelize my life will be easier 

--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists exercicis;
DROP TABLE if exists slides;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE exercicis(
    id INT NOT NULL AUTO_INCREMENT, 
    tipus VARCHAR(40) not null, 
    subtipus VARCHAR(40) not null,
    especie VARCHAR(40) not null,
    fonamental VARCHAR(1) not null,
    completat BOOLEAN not null,
    PRIMARY KEY (id)
    );

CREATE TABLE slides(
    id INT NOT NULL AUTO_INCREMENT,
    activityGroup VARCHAR(50),
    content VARCHAR(2000),
    pageNumber INTEGER,
    PRIMARY KEY (id)
    );

-- wanted to do this with a loop but I don't know how to do it in mysql. And... these have to be coded somewhere, right?
-- I did it as flexible as possible to be able to fetch everything nicely, but there have to be that many choices for exercise group.

INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "major", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "minor", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "dim", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "Maj7", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "7th", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7b5", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "major", "d", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "minor", "d", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "dim", "d", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "Maj7", "d", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7", "d", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "7th", "d", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7b5", "d", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "major", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "minor", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "dim", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "Maj7", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "7th", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7b5", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "major", "f", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "minor", "f", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "dim", "f", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "Maj7", "f", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7", "f", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "7th", "f", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7b5", "f", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "major", "g", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "minor", "g", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "dim", "g", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "Maj7", "g", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7", "g", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "7th", "g", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7b5", "g", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "major", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "minor", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "dim", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "Maj7", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "7th", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7b5", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "major", "b", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "minor", "b", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "triada", "dim", "b", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "Maj7", "b", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7", "b", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "7th", "b", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Chords", "quatriada", "m7b5", "b", false);

INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "maj2", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "min2", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "maj3", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "min3", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "perf4", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "dim4", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "aug4", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "perf5", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "dim5", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "aug5", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "maj6", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "min6", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "maj7", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "min7", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "octave", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "maj2", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "min2", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "maj3", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "min3", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "perf4", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "dim4", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "aug4", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "perf5", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "dim5", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "aug5", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "maj6", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "min6", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "maj7", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "min7", "a", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Intervals", "none", "octave", "a", false);

INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "major", "ionian", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "minor", "dorian", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "minor", "phrygian", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "major", "lydian", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "major", "mixolydian", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "minor", "aeolian", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "dim", "locrian", "c", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "major", "ionian", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "minor", "dorian", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "minor", "phrygian", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "major", "lydian", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "major", "mixolydian", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "minor", "aeolian", "e", false);
INSERT INTO exercicis (tipus, subtipus, especie, fonamental, completat) VALUES ("Scales", "dim", "locrian", "e", false);



INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Chords", "**CHORDS!!**  \nTL;DR: chords are stacks of 3 or more notes.  \nY ya está.  \n...sure, it's more complicated than that, but for the purpose of this app we'll just convene that chords are **groups of notes stacked by intervals of Major/Minor 3rds.**  \n Do you remember major/minor 3rds? We saw them at the intervals thing:  \n- **Minor 3rd:** 1 tone 1 semitone  \n- **Major 3rd:** 2 tones", 1);
INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Chords", "The way a chord sounds is determined by the tonal distance of the notes that build it. For this app, we're looking at **2 main groups** of chords:  \n - **3 notes chords,** (*_acords tríada_* in Catalan, I don't know how it's said in English)  \n - **4 notes chords.** (*_acords quatríada_* in Catalan)", 2);
INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Chords", "The main determining interval for the chord's character is **the third**. Yes, chords are build (for now at least in this app) by stacking thirds... but chords only have a note that's considered the third of the chord: the first interval after the root note.  \n - A 3 notes chord will have 3 notes each a third apart from each other, but only one will be THE THIRD... confusing, I knowewewew but check this:  \ntypical 3 notes chord: **root - third - fifth.**  \nExample: C Major is C - E - G. There's 2 tones from C to E (a Major 3rd!) and 1'5 tones from E to G (a Minor 3rd!), so the chord is build by stacking thirds but the result is *_something called **root** - something called **third** - something called **fifth.**_*", 3);
INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Chords", "That doesn't mean that other notes in the chord don't add specific flavours to its sound, but since most occidental music is based around dividing harmony in the two big groups of **MAJOR** things and **MINOR** things, we look at the third first. And the thing is that, for some psychoacoustic/cultural phenomenon, these two groups tend to have specific **emotional attributes.**  \nTake this with a pinch, but Major chords tend to sound more *_happy and hymnic_* while Minor chords usually sound more *_sad or dramatic_*.  \nYou can kick off your ear training adventure filtering only minor and major things and seeing if you catch the vibe of a *_generally_* major thing or a *_generally_* minor thing.  \nGood luck and happy training!!", 4);
INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Intervals", "**INTERVALS!!**  \n ok, Intervals are **important.**  \n They are the **building blocks of chords**, so if you're able to identify intervals it will be easier for you to identify chords.  \nAn interval is the distance between 2 notes. You take a note and the distance between it and another note is an interval.", 1);
INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Intervals", "If you take a note (we'll call it **root**) and another one, the distance in tones and semitones will determine the type of interval. For the purpose of this activity we'll only use **melodic ascending** intervals (a note and another one higher in pitch played separately), but they can be also **melodic descending** (a note and another one lower in pitch played separately) or **harmonic** (two notes played at the same time).  \nThe following slide contains a table with the most typical intervals.", 2);
INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Intervals", "- **Minor 2nd:** 1 semitone  \n- **Major 2nd:** 1 tone  \n- **Minor 3rd:** 1 tone 1 semitone  \n- **Major 3rd:** 2 tones  \n- **Diminished 4th:** 2 tones  \n- **Perfect 4th:** 2 tones 1semitone  \n- **Augmented 4th:** 3 tones  \n- **Diminished 5th:** 3 tones  \n- **Perfect 5th:** 3 tones 1 semitone  \n- **Augmented 5th:** 4 tones  \n- **Minor 6th:** 3 tones 1 semitone  \n- **Major 6th:** 4 tones  \n- **Minor 7th:** 4 tones 1 semitone  \n- **Major 7th:** 5 tones  \n- **Octave:** 5 tones 1 semitone", 3);
INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Intervals", "These are not all the intervals you can get, but it's a good sample to get started :-)  \n**CAREFUL!** Some intervals have the same tonal distance (they sound the same) but are called different things. Make sure you check the **note distance in the staff** before submitting your answer ^^ \nAlso... everyone has their own way of calling things, so maybe for a musician a **Major 2nd** is called a **b9** instead... so ye, whatever.", 4);
INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Scales", "**SCALES!!**  \nTogether with intervals and chords, scales are one big building block of music. There are many many many many types of scales, you can even go beyond the dodecaphonic system we seem to love so very much *_en occidente_* and find super fancy and super interesting microtonal landscapes beyond the 12 note constraint (hey, not a bad constraint eh... but I believe we have the duty to decolonize music instead of thinking that there's only **ONE** music theory).", 1);
INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Scales", "If you pick one of the 12 semitones between a note and its octave (between a C and the C *_next-in-pitch_* so to say) and you travel from one end (a given root note) to the other (the root note's octave, ascending or descending) following a certain set of rules, you get a scale. That's mostly it.  \nAlthough it does sound arbitrary, academic and full of constraints, they are a thing. They are everywhere in music and, although there's a lot of academicism related to these musical objects, they are out there everywhere and are good approaches to understanding tonality. Then, once you know a few things about it and you're happy with it, you can PETÁRTELO TODO Y HACER LO QUE TE DÉ LA GANA. At least that's my approach hahah", 2);
INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Scales", "So, it works like this:  \nchords are built by stacking thirds, but scales are built (with lots of exceptions but blablabla the app blablabla don't have time) by going up or down from one note (root) to its octave **a Minor 2nd or Major 2nd** at a time.  \nSo, the important interval here is the 2nd. An example:  \nMajor scale: **root** -major 2nd (1 tone)-  **2** -major 2nd (1 tone)- **3** -minor 2nd (half-tone)- **4** -major 2nd (1 tone)- **5** -major 2nd (1 tone)- **6** -major 2nd (1 tone)- **7** -minor 2nd (half-tone) - **octave**.  \nThat's the same as saying 1 - 3 - 4 - 5 - 6 - 7 - 1.  \nUsually we take the Major scale as the source to define all other scales. If you look again at its structure, a major scale has the following intervals between notes (T being a full tone and st beig a half tone): T - T - st - T - T - T - st. Often you'll find scales defined like this, but what I find most useful is refering to the 1 - 2 - 3 - 4 - 5 - 6 - 7 - 1 structure of the major scale and indicating what's different in the scale you want to use.", 3);
INSERT INTO slides (activityGroup, content, pageNumber) VALUES ("Scales", "You can imagine the tones and half-tones (major 2nds and minor 2nds) game like having a **default** setup (the Major scale, T - T - st - T - T - T - st) and moving levers up and down. The levers (for now) can only go up or down a semitone. To represent this, we use the **b** and **#** symbols. If the lever goes down, we use **b**; if the lever goes up we use **#**. Careful! This only works to define the structure of the scale; in the staff notes can have b or # and still keep a different structure than what you would expect. It's so many things...  \nFor example, the minor scale (aeolian mode in fancy gregorian modes) goes like this: 1 - 2 - **b3** - 4 - 5 - **b6** - **b7** - 1. We 'pulled the lever' down for the 3rd, 6th and 7th notes of the scale. And this produces a specific kind of sound.  \nEach scale has its kind of sound, but as with chords, you can start by dividing them by major (*_ionian, lydian, mixolydian_*) and minor (*_dorian, phrygian, aeolian, locrian_*) scales.", 4);