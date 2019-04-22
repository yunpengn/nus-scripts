// ***********************************************************
// READ THE FOLLOWING BEFORE STARTING
// ***********************************************************
// 1. **IMPORTANT STEP** Change the properties in the config object in the next section.

// 2. Login to the portal at: https://mysoc.nus.edu.sg/~tssclaim/. Fill in your bank account information if you haven't.

// 3. Access the page titled 'Student Claim Submission' (https://mysoc.nus.edu.sg/~tssclaim/tutor/teach_claim.php?page=1) and click on
//    the 'Claim' button under your module. You should see the interface for you to enter details of the teaching claim activity.

// 4. Open the JS console (Ctrl/Cmd + Shift/Option + J), paste all the code in this file in the JS console and press enter. You should
//    see the message 'Claim object successfully created. Run c.makeAllClaims() to start.'.

// 5. Run the function c.makeAllClaims() . Wait until the alert 'All claims made!' is shown, then press 'OK'.

// 6. You will be brought back to the previous page. Click on the button 'Claim' again and verify that you have the right number of hours.

// To delete all claims on the page, run the function c.deleteAllClaims()


// ***********************************************************
// CONFIGURE THE RELEVANT PROPERTIES IN THE CONFIG OBJECT
// ***********************************************************

var config = {
  // Your NUSSTU ID, such as A0012345E.
  student_id: prompt('Your NUSSTU ID, such as A0012345E'),
  // Module you are claiming hours for, such as CS1101S
  module: 'CS2103T',
  // Format: YYYY/MM/DD
  // Note: Month is from 0-11, Date is from 1-31
  // This should be the semester's week 1. For AY14/15 Sem 1, it's Monday, Aug 11
  first_day_of_sem: new Date(2018, 7, 13),
  // In case you want to customize the duties field for each activity
  // Do not modify the keys
  duties: {
    'Assignment Marking': 'Reviewed students\' pull requests and project-related work',
    'Course Material Preparation': 'Prepared for tutorial',
    'Tutorial': 'Conducted Tutorial',
    'Project Evaluation': 'Evaluated student projects'
  },

  // The following function should return a list of claim objects that you want to make
  activities_list_fn: function () {
    var activities_list = [];

    for (var week = 2; week <= 13; week++) {
      // Prepared for tutorial sessions: from week 2 to week 13.
      activities_list.push({
        activity_type: Claim.ASSIGNMENT_MARKING,
        week: week,
        day: 'MONDAY',
        start_time: '1000',
        end_time: '1100'
      });

      // Normal tutorial sessions: from week 2 to week 13.
      activities_list.push({
        activity_type: Claim.ASSIGNMENT_MARKING,
        week: week,
        day: 'THURSDAY',
        start_time: '1000',
        end_time: '1100'
      });
    }

    // Extra tutorial session (either you covered tutorials for others or grading week 13).
    activities_list.push({
      activity_type: Claim.ASSIGNMENT_MARKING,
      week: 12,
      day: 'THURSDAY',
      start_time: '0900',
      end_time: '1000'
    });
    activities_list.push({
      activity_type: Claim.ASSIGNMENT_MARKING,
      week: 13,
      day: 'THURSDAY',
      start_time: '1600',
      end_time: '1700'
    });

    // Review pull requests (from week 4 to week 12).
    for (var week = 4; week <= 5; week++) {
      activities_list.push({
        activity_type: Claim.ASSIGNMENT_MARKING,
        week: week,
        day: 'SATURDAY',
        start_time: '1400',
        end_time: '1500'
      });
    }
    for (var week = 6; week <= 12; week++) {
      activities_list.push({
        activity_type: Claim.ASSIGNMENT_MARKING,
        week: week,
        day: 'SATURDAY',
        start_time: '1200',
        end_time: '1400'
      });
    }

    return activities_list;
  }
}

// ***********************************************************
// DO NOT CHANGE THE BOTTOM UNLESS YOU KNOW WHAT YOU ARE DOING
// ***********************************************************

var core_script = 'https://cdn.jsdelivr.net/gh/nusmodifications/nus-scripts/claims/claim.js';
var c = undefined;
$.getScript(core_script)
  .done(function () {
    c = new Claim(config);
  })
  .fail(function (jqxhr, settings, exception ) {
    console.log('Error loading script');
    console.log(jqxhr);
    console.log(exception);
  });
// c.makeAllClaims();
