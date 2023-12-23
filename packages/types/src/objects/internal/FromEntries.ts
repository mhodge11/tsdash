export type FromEntries<entries extends [PropertyKey, any]> =
	| {
			[entry in entries as entry[0]]: entry[1];
	  }
	// prettifies the name.
	| never;
