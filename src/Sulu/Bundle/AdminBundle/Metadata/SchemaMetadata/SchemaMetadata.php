<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\AdminBundle\Metadata\SchemaMetadata;

class SchemaMetadata implements SchemaMetadataInterface
{
    /**
     * @var PropertiesMetadata
     */
    private $propertiesMetadata;

    /**
     * @var AnyOfsMetadata
     */
    private $anyOfsMetadata;

    /**
     * @var AllOfsMetadata
     */
    private $allOfsMetadata;

    /**
     * @param PropertyMetadata[] $properties
     * @param SchemaMetadataInterface[] $anyOfs
     * @param SchemaMetadataInterface[] $allOfs
     */
    public function __construct(array $properties = [], array $anyOfs = [], array $allOfs = [])
    {
        $this->propertiesMetadata = new PropertiesMetadata($properties);
        $this->anyOfsMetadata = new AnyOfsMetadata($anyOfs);
        $this->allOfsMetadata = new AllOfsMetadata($allOfs);
    }

    public function merge(self $schema): self
    {
        return new self([], [], [$this, $schema]);
    }

    public function toJsonSchema(): array
    {
        $jsonSchema = \array_merge(
            [],
            $this->propertiesMetadata->toJsonSchema(),
            $this->anyOfsMetadata->toJsonSchema(),
            $this->allOfsMetadata->toJsonSchema()
        );

        /*
         * If the schema is empty, there should be at least one property, because otherwise the admin ui treats an
         * empty schema object as array instead of an object and would break
         */
        if (empty($jsonSchema)) {
            $jsonSchema['required'] = [];
        }

        return $jsonSchema;
    }
}
