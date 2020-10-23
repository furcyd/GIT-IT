var defs =
    [   {}, // no Def. 0
	
	{ "term": "effectively decidable",
	  "n": 1,
	  "page": 2,
	  "text":
	  "<ul><li>A property $P$ (defined over some domain of objects $D$) is <span class='defined'>effectively decidable</span> iff there is an algorithm (a finite set of instructions for a deterministic computation) for settling in a finite number of steps, for any object $o \\in D$, whether $o$ has property $P$.</li><li>  Likewise, a set $\\Sigma$ is <span class='defined'>effectively decidable</span> iff the property of being a member of that set is effectively decidable.</li><li> Relatedly, the answer to a question $Q$ is <span class='defined'>effectively determinable</span> iff there is an algorithm which gives the answer (again by a deterministic computation, in a finite number of steps).</li></ul>",
	  display: false
	},

	{ "term": "effectively formalized",
	  "n": 2,
	  "page": 4,
	  "text":
	  "An interpreted language $L$ is <span class='defined'>effectively formalized</span> iff <ol><li> it has a finite set of basic symbols,</li><li> syntactic properties such as being a term of the language, being a wff, being a wff with one free variable, and being a sentence, are effectively decidable and the syntactic structure of any sentence is effectively determinable, and</li><li> this syntactic structure together with the semantic rules can be used to effectively determine the unique intended interpretation of any sentence.</li></ol>",
	  display: false
	},
	{
	    "term": "effectively axiomatized formal theory",
	    "n": 3,
	    "page": 5,
	    "text":
	    "An <span class='defined'>effectively axiomatized formal theory</span> $T$ has an effectively formalized language $L$, a certain class of $L$-wffs are picked out as axioms where it is effectively decidable what’s an axiom, and it has a proof system such that it is effectively decidable whether a given array of wffs is a derivation from the axioms according to the rules.",
	  display: false
	},

	{
	    "term": "derivability or $\\vdash$",
	    "n": 4,
	    "page": 5,
	    "text":
	    "&lsquo; <span class='defined'>$T \\vdash \\varphi$</span>&rsquo; says: there is a formal deduction in $T$’s proof system from $T$-axioms to the sentence $\\varphi$ as conclusion (in short, $\\varphi$ is a $T$-theorem).",
	  display: false

	},

	{
	    "term": "logical entailment or $\\models$",
	    "n": 5,
	    "page": 5,
	    "text": 
	    "&lsquo; <span class='defined'>$T \\models \\varphi$</span>&rsquo; says: any way of (re)interpreting the non-logical vocabulary that makes all the axioms of $T$ true makes $\\varphi$ true.",
	    display: false
	},
	{
	    "term": "formally decides",
	    "n": 6,
	    "page": 6,
	    "text":
	    "If $T$ is a theory, and $\\varphi$ is some sentence of the language of that theory, then T <span class='defined'>formally decides</span>  $\\varphi$ iff either $T \\vdash \\varphi$ or $T \\vdash  &not; \\varphi$",
	    display: false
	}

    ];



